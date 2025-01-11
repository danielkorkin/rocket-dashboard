import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from "react";

interface DataProviderProps {
	children: React.ReactNode;
	widgets: any[];
	baseUrl: string;
}

interface DataContextType {
	data: Record<string, any>;
}

const DataContext = createContext<DataContextType>({ data: {} });

export const DataProvider: React.FC<DataProviderProps> = ({
	children,
	widgets,
	baseUrl,
}) => {
	const [data, setData] = useState<Record<string, any>>({});
	const websocketsRef = useRef<Record<string, WebSocket>>({});
	const mounted = useRef(true);

	const updateData = useCallback((dataKey: string, value: any) => {
		if (mounted.current) {
			setData((prev) => ({
				...prev,
				[dataKey]: value,
			}));
		}
	}, []);

	useEffect(() => {
		mounted.current = true;

		if (!baseUrl) {
			console.log("No baseUrl provided, skipping WebSocket connections");
			return;
		}

		// Clean up existing connections
		Object.values(websocketsRef.current).forEach((ws) => ws.close());
		websocketsRef.current = {};

		// Get unique data keys
		const dataKeys = [
			...new Set(
				widgets
					.filter((widget) => widget.dataKey || widget.source)
					.map((widget) => widget.dataKey || widget.source)
			),
		];

		console.log("Connecting to WebSockets for keys:", dataKeys);

		// Create new connections
		dataKeys.forEach((dataKey) => {
			if (!dataKey) return;

			const wsUrl = `${baseUrl}/${dataKey}`;
			console.log(`Connecting to WebSocket: ${wsUrl}`);

			const ws = new WebSocket(wsUrl);

			ws.onopen = () => {
				console.log(`Connected to ${wsUrl}`);
			};

			ws.onmessage = (event) => {
				try {
					const newData = JSON.parse(event.data);
					console.log(`Received data for ${dataKey}:`, newData);
					updateData(dataKey, newData.value);
				} catch (error) {
					console.error(`Error parsing data for ${dataKey}:`, error);
				}
			};

			ws.onerror = (error) => {
				console.error(`WebSocket error for ${dataKey}:`, error);
			};

			ws.onclose = (event) => {
				console.log(
					`WebSocket closed for ${dataKey}:`,
					event.code,
					event.reason
				);
				// Implement reconnection logic if needed
				if (mounted.current) {
					setTimeout(() => {
						console.log(`Attempting to reconnect ${dataKey}...`);
						// Reconnection logic here
					}, 5000);
				}
			};

			websocketsRef.current[dataKey] = ws;
		});

		return () => {
			console.log("Cleaning up WebSocket connections");
			mounted.current = false;
			Object.values(websocketsRef.current).forEach((ws) => ws.close());
			websocketsRef.current = {};
		};
	}, [baseUrl, widgets, updateData]);

	const value = useMemo(() => ({ data }), [data]);

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
};
