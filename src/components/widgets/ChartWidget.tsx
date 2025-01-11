"use client";

import React, { useState, useEffect, useCallback } from "react";
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

interface ChartWidgetProps {
	dataKey: string;
	unit?: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ dataKey, unit = "" }) => {
	const [chartData, setChartData] = useState<Array<any>>([]);
	const { data } = useData();

	const updateChartData = useCallback(() => {
		const value = data[dataKey];
		if (typeof value !== "undefined") {
			setChartData((prev) => {
				const newData = [
					...prev,
					{
						time: new Date().getTime(),
						[dataKey]: value,
					},
				];
				// Keep last 30 data points
				return newData.slice(-30);
			});
		}
	}, [data, dataKey]);

	useEffect(() => {
		updateChartData();
	}, [data[dataKey]]); // Only update when the specific dataKey value changes

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
				<YAxis
					domain={["auto", "auto"]}
					label={{ value: unit, angle: -90, position: "insideLeft" }}
				/>
				<Tooltip
					labelFormatter={(time) =>
						new Date(time).toLocaleTimeString()
					}
					formatter={(value) => [`${value} ${unit}`, dataKey]}
				/>
				<Line
					type="monotone"
					dataKey={dataKey}
					stroke="#8884d8"
					dot={false}
					isAnimationActive={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ChartWidget;
