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

	const updateData = useCallback((dataKey: string, receivedData: any) => {
		if (mounted.current) {
			setData((prev) => ({
				...prev,
				[dataKey]: receivedData[dataKey], // Use the specific key from received data
			}));
			console.log("Updated data:", dataKey, receivedData[dataKey]); // Debug log
		}
	}, []);

	useEffect(() => {
		mounted.current = true;

		if (!baseUrl) return;

		// Clean up existing connections
		Object.values(websocketsRef.current).forEach((ws) => ws.close());
		websocketsRef.current = {};

		const dataKeys = [
			...new Set(
				widgets
					.filter((widget) => widget.dataKey || widget.source)
					.map((widget) => widget.dataKey || widget.source)
			),
		];

		console.log("Connecting to WebSockets for keys:", dataKeys);

		dataKeys.forEach((dataKey) => {
			if (!dataKey) return;

			const wsUrl = `${baseUrl}/${dataKey}`;
			console.log(`Connecting to WebSocket: ${wsUrl}`);

			const ws = new WebSocket(wsUrl);

			ws.onmessage = (event) => {
				try {
					const newData = JSON.parse(event.data);
					console.log(`Received data for ${dataKey}:`, newData);
					updateData(dataKey, newData);
				} catch (error) {
					console.error(`Error parsing data for ${dataKey}:`, error);
				}
			};

			websocketsRef.current[dataKey] = ws;
		});

		return () => {
			mounted.current = false;
			Object.values(websocketsRef.current).forEach((ws) => ws.close());
			websocketsRef.current = {};
		};
	}, [baseUrl, widgets, updateData]);

	const contextValue = useMemo(() => ({ data }), [data]);

	return (
		<DataContext.Provider value={contextValue}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
};
