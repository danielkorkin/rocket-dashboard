"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
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
export const useData = () => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return { data: context.data || {} }; // Ensure data is never undefined
};

export const DataProvider: React.FC<DataProviderProps> = ({
	children,
	widgets,
	baseUrl,
}) => {
	const [data, setData] = useState<Record<string, any>>(() => {
		const initialData: Record<string, any> = {};
		widgets
			.filter((widget) => widget.dataKey || widget.source)
			.forEach((widget) => {
				const key = widget.dataKey || widget.source;
				if (key) initialData[key] = 0;
			});
		return initialData;
	});
	const [webSockets, setWebSockets] = useState<Record<string, WebSocket>>({});
	const [connectionStatus, setConnectionStatus] = useState<
		Record<string, boolean>
	>({});

	const updateData = useCallback((dataKey: string, value: any) => {
		console.log(`Updating data for ${dataKey}:`, value);
		setData((prev) => ({
			...prev,
			[dataKey]: value,
		}));
	}, []);

	useEffect(() => {
		if (!baseUrl) return;

		// Clean up existing connections
		Object.values(webSockets).forEach((ws) => ws.close());

		// Get unique data keys from widgets
		const dataKeys = [
			...new Set(
				widgets
					.filter((widget) => widget.dataKey || widget.source)
					.map((widget) => widget.dataKey || widget.source)
			),
		];

		console.log("Creating WebSocket connections for:", dataKeys); // Debug log

		// Create new connections
		const newWebSockets: Record<string, WebSocket> = {};
		const newConnectionStatus: Record<string, boolean> = {};

		dataKeys.forEach((dataKey) => {
			if (!dataKey) return;

			const wsUrl = `${baseUrl}/${dataKey}`;
			console.log(`Connecting to WebSocket: ${wsUrl}`); // Debug log

			const ws = new WebSocket(wsUrl);

			ws.onopen = () => {
				console.log(`Connected to ${dataKey}`);
				newConnectionStatus[dataKey] = true;
				setConnectionStatus((prev) => ({
					...prev,
					[dataKey]: true,
				}));
			};

			ws.onmessage = (event) => {
				try {
					const newData = JSON.parse(event.data);
					console.log(`Received data for ${dataKey}:`, newData); // Debug log
					updateData(dataKey, newData.value);
				} catch (error) {
					console.error(`Error parsing data for ${dataKey}:`, error);
				}
			};

			ws.onerror = (error) => {
				console.error(`WebSocket error for ${dataKey}:`, error);
				newConnectionStatus[dataKey] = false;
				setConnectionStatus((prev) => ({
					...prev,
					[dataKey]: false,
				}));
			};

			ws.onclose = () => {
				console.log(`Connection closed for ${dataKey}`);
				newConnectionStatus[dataKey] = false;
				setConnectionStatus((prev) => ({
					...prev,
					[dataKey]: false,
				}));
			};

			newWebSockets[dataKey] = ws;
		});

		setWebSockets(newWebSockets);
		setConnectionStatus(newConnectionStatus);

		return () => {
			console.log("Cleaning up WebSocket connections");
			Object.values(newWebSockets).forEach((ws) => ws.close());
		};
	}, [baseUrl, widgets, updateData]);

	return (
		<DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
	);
};
