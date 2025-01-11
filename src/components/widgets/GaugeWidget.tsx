"use client";

import { useData } from "../DataProvider";
import React, { useMemo } from 'react';

interface GaugeWidgetProps {
	dataKey: string;
	min?: number;
	max?: number;
	unit?: string;
}

const GaugeWidget: React.FC<GaugeWidgetProps> = ({
	dataKey,
	min = 0,
	max = 100,
	unit = "",
}) => {
	const { data } = useData();

	const value = useMemo(() => Number(data[dataKey] ?? 0), [data, dataKey]);

	const percentage = useMemo(
		() => Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)),
		[value, min, max]
	);

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
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
					<div className="text-xl font-bold">{value.toFixed(1)}</div>
					<div className="text-xs">{unit}</div>
				</div>
			</div>
		</div>
	);
};

export default GaugeWidget;
