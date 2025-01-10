"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../DataProvider";

const HeadingWidget: React.FC = () => {
	const data = useData();
	const [heading, setHeading] = useState(0);

	useEffect(() => {
		setHeading(data.heading || 0);
	}, [data.heading]);

	const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="relative w-full h-12 bg-gray-200 rounded-full overflow-hidden">
				<div
					className="absolute top-0 left-0 h-full bg-blue-500"
					style={{ width: `${(heading / 360) * 100}%` }}
				></div>
				{compassPoints.map((point, index) => (
					<div
						key={point}
						className="absolute top-0 h-full flex items-center justify-center text-xs font-bold"
						style={{ left: `${(index / 8) * 100}%` }}
					>
						{point}
					</div>
				))}
			</div>
			<span className="mt-2 text-lg font-bold">
				{heading.toFixed(1)}°
			</span>
		</div>
	);
};

export default HeadingWidget;
