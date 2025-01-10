"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { format, differenceInMilliseconds } from "date-fns";

interface TimerWidgetProps {
	isRunning: boolean;
	startTime: Date | null;
	onStart: () => void;
	onStop: () => void;
	onReset: () => void;
}

const TimerWidget: React.FC<TimerWidgetProps> = ({
	isRunning,
	startTime,
	onStart,
	onStop,
	onReset,
}) => {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning && startTime) {
			interval = setInterval(() => {
				const now = new Date();
				setElapsedTime(differenceInMilliseconds(now, startTime));
			}, 1);
		}
		return () => clearInterval(interval);
	}, [isRunning, startTime]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center space-y-4">
			<div className="text-4xl font-mono">
				{format(elapsedTime, "HH:mm:ss.SSS")}
			</div>
			<div className="flex space-x-2">
				<Button onClick={isRunning ? onStop : onStart}>
					{isRunning ? "Stop" : "Start"}
				</Button>
				<Button onClick={onReset}>Reset</Button>
			</div>
		</div>
	);
};

export default TimerWidget;
