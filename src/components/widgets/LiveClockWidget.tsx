"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

interface LiveClockWidgetProps {
	timezone: string;
}

const LiveClockWidget: React.FC<LiveClockWidgetProps> = ({ timezone }) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="text-4xl font-mono">
				{formatInTimeZone(time, timezone, "HH:mm:ss.SSS")}
			</div>
		</div>
	);
};

export default LiveClockWidget;
