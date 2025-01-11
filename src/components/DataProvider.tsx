"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children, widgets }) => {
	const [data, setData] = useState({});
	const [baseUrl, setBaseUrl] = useState("");
	const [webSockets, setWebSockets] = useState({});

	const updateData = useCallback((dataKey, value) => {
		setData((prevData) => {
			const newData = { ...prevData, [dataKey]: value };
			return newData;
		});
	}, []);

	useEffect(() => {
		if (!baseUrl) return;

		const dataKeys = [
			...new Set(
				widgets
					.filter((widget) => widget.dataKey || widget.source)
					.map((widget) => widget.dataKey || widget.source)
			),
		];

		Object.values(webSockets).forEach((ws) => ws.close());

		const newWebSockets = {};
		dataKeys.forEach((dataKey) => {
			if (!newWebSockets[dataKey]) {
				const ws = new WebSocket(`${baseUrl}/${dataKey}`);

				ws.onopen = () => {
					console.log(`WebSocket connected for ${dataKey}`);
				};

				ws.onmessage = (event) => {
					try {
						const newData = JSON.parse(event.data);
						updateData(dataKey, newData.value);
					} catch (error) {
						console.error(
							`Error parsing WebSocket data for ${dataKey}:`,
							error
						);
					}
				};

				ws.onerror = (error) => {
					console.error(`WebSocket error for ${dataKey}:`, error);
				};

				ws.onclose = () => {
					console.log(`WebSocket disconnected for ${dataKey}`);
					setTimeout(() => {
						const newWs = new WebSocket(`${baseUrl}/${dataKey}`);
						setWebSockets((prev) => ({
							...prev,
							[dataKey]: newWs,
						}));
					}, 5000);
				};

				newWebSockets[dataKey] = ws;
			}
		});

		setWebSockets(newWebSockets);

		return () => {
			Object.values(newWebSockets).forEach((ws) => ws.close());
		};
	}, [baseUrl, widgets, updateData]);

	return (
		<DataContext.Provider value={{ data, setBaseUrl }}>
			{children}
		</DataContext.Provider>
	);
};
