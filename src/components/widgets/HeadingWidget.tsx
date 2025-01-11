"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useData } from "../DataProvider";

const HeadingWidget: React.FC = () => {
	const [heading, setHeading] = useState(0);
	const { data } = useData();

	const updateHeading = useCallback(() => {
		const value = data.heading;
		if (typeof value !== "undefined") {
			setHeading(value);
		}
	}, [data.heading]);

	useEffect(() => {
		updateHeading();
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
