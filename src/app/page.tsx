"use client";

import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DataProvider } from "../components/DataProvider";
import WidgetContainer from "../components/WidgetContainer";
import AddWidgetButton from "../components/AddWidgetButton";
import { Save, Upload, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataSetup } from "../components/DataSetup";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayouts = {
	lg: [
		{ i: "video", x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
		{ i: "speed", x: 6, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "altitude", x: 8, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "gforce", x: 10, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "speedChart", x: 0, y: 4, w: 4, h: 3, minW: 3, minH: 3 },
		{ i: "gforceChart", x: 4, y: 4, w: 4, h: 3, minW: 3, minH: 3 },
		{ i: "altitudeChart", x: 8, y: 4, w: 4, h: 3, minW: 3, minH: 3 },
		{ i: "rollRate", x: 0, y: 7, w: 2, h: 3, minW: 2, minH: 3 },
		{ i: "heading", x: 2, y: 7, w: 4, h: 2, minW: 3, minH: 2 },
		{ i: "clock", x: 6, y: 7, w: 3, h: 2, minW: 3, minH: 2 },
		{ i: "temperature", x: 9, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "timer", x: 11, y: 7, w: 3, h: 2, minW: 3, minH: 2 },
	],
};

export default function Dashboard() {
	const [layouts, setLayouts] = useState(initialLayouts);
	const [widgets, setWidgets] = useState([
		{ id: "video", type: "video", title: "Live Stream" },
		{
			id: "speed",
			type: "gauge",
			title: "Current Speed",
			dataKey: "speed",
			unit: "m/s",
		},
		{
			id: "altitude",
			type: "gauge",
			title: "Current Altitude",
			dataKey: "altitude",
			unit: "m",
		},
		{
			id: "gforce",
			type: "gauge",
			title: "Current G Force",
			dataKey: "gForce",
			unit: "g",
		},
		{
			id: "speedChart",
			type: "chart",
			title: "Speed Chart",
			dataKey: "speed",
			unit: "m/s",
		},
		{
			id: "gforceChart",
			type: "chart",
			title: "G Force Chart",
			dataKey: "gForce",
			unit: "g",
		},
		{
			id: "altitudeChart",
			type: "chart",
			title: "Altitude Chart",
			dataKey: "altitude",
			unit: "m",
		},
		{
			id: "rollRate",
			type: "rollRate",
			title: "Roll Rate",
			dataKey: "rollRate",
			unit: "°/s",
		},
		{
			id: "heading",
			type: "heading",
			title: "Heading",
			dataKey: "heading",
		},
		{ id: "clock", type: "clock", title: "Mission Clock", timezone: "UTC" },
		{
			id: "temperature",
			type: "number",
			title: "Temperature",
			source: "temperature",
			unit: "°C",
		},
		{ id: "timer", type: "timer", title: "Mission Timer" },
	]);
	const [isLayoutLocked, setIsLayoutLocked] = useState(false);
	const [baseUrl, setBaseUrl] = useState("");

	const onLayoutChange = (layout, layouts) => {
		if (!isLayoutLocked) {
			setLayouts(layouts);
		}
	};

	const addWidget = (widgetType) => {
		if (!isLayoutLocked) {
			const newId = `widget-${Date.now()}`;
			setWidgets([
				...widgets,
				{ id: newId, type: widgetType, title: "New Widget" },
			]);
			setLayouts({
				...layouts,
				lg: [
					...layouts.lg,
					{ i: newId, x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
				],
			});
		}
	};

	const removeWidget = (widgetId) => {
		if (!isLayoutLocked) {
			setWidgets(widgets.filter((widget) => widget.id !== widgetId));
			setLayouts({
				...layouts,
				lg: layouts.lg.filter((item) => item.i !== widgetId),
			});
		}
	};

	const updateWidget = (widgetId, newProps) => {
		if (!isLayoutLocked) {
			setWidgets(
				widgets.map((widget) =>
					widget.id === widgetId ? { ...widget, ...newProps } : widget
				)
			);
		}
	};

	const exportLayout = () => {
		const data = JSON.stringify({ layouts, widgets, baseUrl });
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "dashboard-layout.json";
		link.click();
	};

	const importLayout = (event) => {
		if (!isLayoutLocked) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const importedData = JSON.parse(e.target.result);
						setLayouts(importedData.layouts);
						setWidgets(importedData.widgets);
						setBaseUrl(importedData.baseUrl);
					} catch (error) {
						console.error("Error importing layout:", error);
					}
				};
				reader.readAsText(file);
			}
		}
	};

	return (
		<DataProvider
			widgets={widgets}
			baseUrl={baseUrl}
			setBaseUrl={setBaseUrl}
		>
			<div className="p-4">
				<div
					className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
					role="alert"
				>
					<p className="font-bold">Note:</p>
					<p>
						This dashboard is designed for local hosting and
						development purposes only. It is not intended for
						production deployment.
					</p>
				</div>
				<h1 className="text-2xl font-bold mb-4">
					Rocket Launch Dashboard
				</h1>
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center space-x-4">
						<DataSetup />
						<div className="flex items-center space-x-2">
							<Switch
								id="lock-layout"
								checked={isLayoutLocked}
								onCheckedChange={setIsLayoutLocked}
							/>
							<Label
								htmlFor="lock-layout"
								className="flex items-center cursor-pointer"
							>
								{isLayoutLocked ? (
									<Lock className="h-4 w-4 mr-2" />
								) : (
									<Unlock className="h-4 w-4 mr-2" />
								)}
								Lock Layout
							</Label>
						</div>
					</div>
					<AddWidgetButton
						onAdd={addWidget}
						disabled={isLayoutLocked}
					/>
				</div>
				<div className="flex justify-end mb-4">
					<Button onClick={exportLayout} className="mr-2">
						<Save className="mr-2 h-4 w-4" /> Export Layout
					</Button>
					<Button
						onClick={() =>
							document.getElementById("import-layout").click()
						}
						disabled={isLayoutLocked}
					>
						<Upload className="mr-2 h-4 w-4" /> Import Layout
					</Button>
					<input
						id="import-layout"
						type="file"
						accept=".json"
						onChange={importLayout}
						style={{ display: "none" }}
						disabled={isLayoutLocked}
					/>
				</div>
				<ResponsiveGridLayout
					className="layout"
					layouts={layouts}
					onLayoutChange={onLayoutChange}
					breakpoints={{
						lg: 1200,
						md: 996,
						sm: 768,
						xs: 480,
						xxs: 0,
					}}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={100}
					isDraggable={!isLayoutLocked}
					isResizable={!isLayoutLocked}
				>
					{widgets.map((widget) => (
						<div key={widget.id}>
							<WidgetContainer
								widget={widget}
								onRemove={() => removeWidget(widget.id)}
								onUpdate={(newProps) =>
									updateWidget(widget.id, newProps)
								}
								isLocked={isLayoutLocked}
							/>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		</DataProvider>
	);
}
