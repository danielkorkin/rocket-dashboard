"use client";

import React from "react";
import { format } from "date-fns";

interface TimerWidgetProps {
	isRunning: boolean;
	startTime: Date | null;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({ isRunning, startTime }) => {
	const elapsedTime =
		isRunning && startTime ? Date.now() - startTime.getTime() : 0;

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="text-4xl font-mono">
				{format(elapsedTime, "HH:mm:ss.SSS")}
			</div>
		</div>
	);
};

export default TimerWidget;
