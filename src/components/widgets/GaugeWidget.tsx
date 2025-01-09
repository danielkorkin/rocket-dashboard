"use client";

import React from "react";
import { useData } from "../DataProvider";

const GaugeWidget = ({ dataKey, min = 0, max = 100, unit = "" }) => {
	const data = useData();
	const value = data[dataKey] || 0;
	const percentage = ((value - min) / (max - min)) * 100;

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-32 h-32">
				<svg className="w-full h-full" viewBox="0 0 100 100">
					<circle
						className="text-gray-200 stroke-current"
						strokeWidth="10"
						cx="50"
						cy="50"
						r="40"
						fill="transparent"
					/>
					<circle
						className="text-blue-600 progress-ring__circle stroke-current"
						strokeWidth="10"
						strokeLinecap="round"
						cx="50"
						cy="50"
						r="40"
						fill="transparent"
						strokeDasharray="251.2"
						strokeDashoffset={251.2 * (1 - percentage / 100)}
						transform="rotate(-90 50 50)"
					/>
				</svg>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
					{value.toFixed(1)}
				</div>
			</div>
			<div className="mt-2 text-sm">{unit}</div>
		</div>
	);
};

export default GaugeWidget;
