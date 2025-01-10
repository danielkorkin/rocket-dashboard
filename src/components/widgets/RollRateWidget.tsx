"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../DataProvider";

const RollRateWidget: React.FC = () => {
	const data = useData();
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		setRotation(data.rollRate || 0);
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
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-lg font-bold">
						{rotation.toFixed(2)}°/s
					</span>
				</div>
			</div>
		</div>
	);
};

export default RollRateWidget;
