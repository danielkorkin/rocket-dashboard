"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
	const [data, setData] = useState({
		speed: 0,
		altitude: 0,
		gForce: 0,
		rollRate: 0,
		heading: 0,
		temperature: 0,
	});
	const [webSocketUrl, setWebSocketUrl] = useState("");

	useEffect(() => {
		let ws: WebSocket | null = null;
		let interval: NodeJS.Timeout | null = null;

		const connectWebSocket = () => {
			if (webSocketUrl) {
				ws = new WebSocket(webSocketUrl);

				ws.onopen = () => {
					console.log("WebSocket connected");
				};

				ws.onmessage = (event) => {
					try {
						const newData = JSON.parse(event.data);
						setData((prevData) => ({ ...prevData, ...newData }));
					} catch (error) {
						console.error("Error parsing WebSocket data:", error);
					}
				};

				ws.onerror = (error) => {
					console.error("WebSocket error:", error);
				};

				ws.onclose = () => {
					console.log("WebSocket disconnected");
				};
			} else {
				// Fallback to simulated data when no WebSocket URL is provided
				interval = setInterval(() => {
					setData((prevData) => ({
						speed: Math.min(
							prevData.speed + Math.random() * 10,
							1000
						),
						altitude: Math.min(
							prevData.altitude + Math.random() * 100,
							10000
						),
						gForce: Math.min(prevData.gForce + Math.random(), 5),
						rollRate:
							(prevData.rollRate + Math.random() * 10 - 5) % 360,
						heading: (prevData.heading + Math.random() * 5) % 360,
						temperature: Math.min(
							Math.max(
								prevData.temperature + Math.random() * 2 - 1,
								-50
							),
							50
						),
					}));
				}, 1000);
			}
		};

		connectWebSocket();

		return () => {
			if (ws) {
				ws.close();
			}
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [webSocketUrl]);

	return (
		<DataContext.Provider value={{ ...data, setWebSocketUrl }}>
			{children}
		</DataContext.Provider>
	);
};
