"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";

const VideoWidget = dynamic(() => import("@/components/widgets/VideoWidget"));
const GaugeWidget = dynamic(() => import("@/components/widgets/GaugeWidget"));
const ChartWidget = dynamic(() => import("@/components/widgets/ChartWidget"));
const WidgetEditor = dynamic(() => import("@/components/WidgetEditor"));

const WidgetContainer = ({ widget, onRemove, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);

	const renderWidget = () => {
		switch (widget.type) {
			case "video":
				return <VideoWidget {...widget} />;
			case "gauge":
				return <GaugeWidget {...widget} />;
			case "chart":
				return <ChartWidget {...widget} />;
			default:
				return <div>Unknown widget type</div>;
		}
	};

	return (
		<Card className="h-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{widget.title}
				</CardTitle>
				<div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsEditing(true)}
					>
						<Settings className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="icon" onClick={onRemove}>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>{renderWidget()}</CardContent>
			{isEditing && (
				<WidgetEditor
					widget={widget}
					onUpdate={(newProps) => {
						onUpdate(newProps);
						setIsEditing(false);
					}}
					onCancel={() => setIsEditing(false)}
				/>
			)}
		</Card>
	);
};

export default WidgetContainer;
