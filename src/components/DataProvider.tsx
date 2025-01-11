"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children, widgets }) => {
	const [data, setData] = useState({});
	const [baseUrl, setBaseUrl] = useState("");
	const [webSockets, setWebSockets] = useState({});

	useEffect(() => {
		if (!baseUrl) return;

		// Detect data keys from widgets
		const dataKeys = widgets
			.filter((widget) => widget.dataKey || widget.source)
			.map((widget) => widget.dataKey || widget.source);

		// Close existing WebSockets
		Object.values(webSockets).forEach((ws) => ws.close());

		// Create new WebSockets for each data key
		const newWebSockets = {};
		dataKeys.forEach((dataKey) => {
			const ws = new WebSocket(`${baseUrl}/${dataKey}`);

			ws.onopen = () => {
				console.log(`WebSocket connected for ${dataKey}`);
			};

			ws.onmessage = (event) => {
				try {
					const newData = JSON.parse(event.data);
					setData((prevData) => ({
						...prevData,
						[dataKey]: newData.value,
					}));
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
				// Attempt to reconnect after 5 seconds
				setTimeout(() => {
					const newWs = new WebSocket(`${baseUrl}/${dataKey}`);
					setWebSockets((prev) => ({ ...prev, [dataKey]: newWs }));
				}, 5000);
			};

			newWebSockets[dataKey] = ws;
		});

		setWebSockets(newWebSockets);

		// Cleanup function
		return () => {
			Object.values(newWebSockets).forEach((ws) => ws.close());
		};
	}, [baseUrl, widgets]);

	return (
		<DataContext.Provider value={{ ...data, setBaseUrl }}>
			{children}
		</DataContext.Provider>
	);
};
