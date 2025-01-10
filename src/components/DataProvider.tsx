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

	useEffect(() => {
		// Simulated data updates
		const interval = setInterval(() => {
			setData((prevData) => ({
				speed: Math.min(prevData.speed + Math.random() * 10, 1000),
				altitude: Math.min(
					prevData.altitude + Math.random() * 100,
					10000
				),
				gForce: Math.min(prevData.gForce + Math.random(), 5),
				rollRate: (prevData.rollRate + Math.random() * 10 - 5) % 360,
				heading: (prevData.heading + Math.random() * 5) % 360,
				temperature: Math.min(
					Math.max(prevData.temperature + Math.random() * 2 - 1, -50),
					50
				),
			}));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
