"use client";

import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useData } from "../DataProvider";

const ChartWidget = ({ dataKey, unit = "" }) => {
	const [chartData, setChartData] = useState([]);
	const currentData = useData();

	useEffect(() => {
		setChartData((prevData) => {
			const newData = [
				...prevData,
				{ time: new Date().getTime(), [dataKey]: currentData[dataKey] },
			];
			if (newData.length > 20) newData.shift();
			return newData;
		});
	}, [currentData, dataKey]);

	return (
		<ResponsiveContainer width="100%" height={200}>
			<LineChart data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="time"
					tickFormatter={(time) =>
						new Date(time).toLocaleTimeString()
					}
				/>
				<YAxis />
				<Tooltip
					labelFormatter={(time) =>
						new Date(time).toLocaleTimeString()
					}
					formatter={(value) => [`${value} ${unit}`, dataKey]}
				/>
				<Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ChartWidget;
