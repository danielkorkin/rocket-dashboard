"use client";

import React from "react";
import { useData } from "../DataProvider";

interface NumberWidgetProps {
	source: string;
	unit?: string;
}

const NumberWidget: React.FC<NumberWidgetProps> = ({ source, unit = "" }) => {
	const data = useData();
	const value = data[source] || 0;

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="text-4xl font-bold">{value.toFixed(2)}</div>
			{unit && <div className="text-xl mt-2">{unit}</div>}
		</div>
	);
};

export default NumberWidget;
