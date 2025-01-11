"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";

const VideoWidget = dynamic(() => import("./widgets/VideoWidget"));
const GaugeWidget = dynamic(() => import("./widgets/GaugeWidget"));
const ChartWidget = dynamic(() => import("./widgets/ChartWidget"));
const WidgetEditor = dynamic(() => import("./WidgetEditor"));
const RollRateWidget = dynamic(() => import("./widgets/RollRateWidget"));
const HeadingWidget = dynamic(() => import("./widgets/HeadingWidget"));
const LiveClockWidget = dynamic(() => import("./widgets/LiveClockWidget"));
const NumberWidget = dynamic(() => import("./widgets/NumberWidget"));
const TimerWidget = dynamic(() => import("./widgets/TimerWidget"));

interface WidgetContainerProps {
	widget: {
		id: string;
		type: string;
		title: string;
		videoUrl?: string;
		source?: string;
		unit?: string;
		timezone?: string;
		startDate?: string;
		startTime?: string;
		timerTimezone?: string;
	};
	onRemove: () => void;
	onUpdate: (newProps: any) => void;
	isLocked: boolean;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
	widget,
	onRemove,
	onUpdate,
	isLocked,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const renderWidget = () => {
		switch (widget.type) {
			case "video":
				return <VideoWidget videoUrl={widget.videoUrl} />;
			case "gauge":
				return <GaugeWidget {...widget} />;
			case "chart":
				return <ChartWidget {...widget} />;
			case "rollRate":
				return <RollRateWidget />;
			case "heading":
				return <HeadingWidget />;
			case "clock":
				return <LiveClockWidget timezone={widget.timezone || "UTC"} />;
			case "number":
				return (
					<NumberWidget source={widget.source} unit={widget.unit} />
				);
			case "timer":
				return (
					<TimerWidget
						isRunning={widget.startTime !== null}
						startTime={
							widget.startTime ? new Date(widget.startTime) : null
						}
					/>
				);
			default:
				return <div>Unknown widget type</div>;
		}
	};

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{widget.title}
				</CardTitle>
				{!isLocked && (
					<div>
						<Button
							variant="ghost"
							size="icon"
							onClick={(e) => {
								e.stopPropagation();
								setIsEditing(true);
							}}
							onMouseDown={(e) => e.stopPropagation()}
						>
							<Settings className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={(e) => {
								e.stopPropagation();
								onRemove();
							}}
							onMouseDown={(e) => e.stopPropagation()}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				)}
			</CardHeader>
			<CardContent className="flex-grow relative">
				{renderWidget()}
			</CardContent>
			{isEditing && !isLocked && (
				<WidgetEditor
					widget={widget}
					onUpdate={(newProps) => {
						onUpdate({ ...widget, ...newProps });
						setIsEditing(false);
					}}
					onCancel={() => setIsEditing(false)}
				/>
			)}
		</Card>
	);
};

export default WidgetContainer;
