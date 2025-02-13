"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useData } from "../DataProvider";

interface RollRateWidgetProps {
	unit?: string;
}

const RollRateWidget: React.FC<RollRateWidgetProps> = ({ unit = "°/s" }) => {
	const [rotation, setRotation] = useState(0);
	const { data } = useData();

	const updateRotation = useCallback(() => {
		const value = data.rollRate;
		if (typeof value !== "undefined") {
			setRotation(value);
		}
	}, [data.rollRate]);

	useEffect(() => {
		updateRotation();
	}, [data.rollRate]);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="relative w-48 h-48">
				<div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
				<div
					className="absolute inset-0 border-4 border-gray-300 rounded-full"
					style={{ transform: "rotate(90deg)" }}
				></div>
				<div
					className="absolute inset-0 flex items-center justify-center"
					style={{ transform: `rotate(${rotation}deg)` }}
				>
					<div className="w-1 h-full bg-blue-500"></div>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-lg font-bold">
						{rotation.toFixed(2)}
					</span>
					<span className="text-sm">{unit}</span>
				</div>
			</div>
		</div>
	);
};

export default RollRateWidget;
