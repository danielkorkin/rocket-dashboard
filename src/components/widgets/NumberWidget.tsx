"use client";

import React, { useState, useEffect } from "react";
import { useData } from "../DataProvider";

interface NumberWidgetProps {
	source?: string;
	dataKey?: string; // Add dataKey as alternative prop
	unit?: string;
}

const NumberWidget: React.FC<NumberWidgetProps> = ({
	source,
	dataKey,
	unit = "",
}) => {
	const [value, setValue] = useState(0);
	const { data } = useData();

	// Use source or dataKey
	const key = source || dataKey;

	useEffect(() => {
		// Add debug logging
		console.log("NumberWidget data:", data);
		console.log("NumberWidget key:", key);
		console.log("NumberWidget current value:", key ? data[key] : undefined);

		if (!key) return; // Guard against undefined key

		const newValue = data[key];
		if (typeof newValue !== "undefined" && newValue !== null) {
			setValue(Number(newValue));
		}
	}, [data, key]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div className="text-4xl font-bold">{value.toFixed(2)}</div>
			{unit && <div className="text-sm mt-2">{unit}</div>}
		</div>
	);
};

export default NumberWidget;
