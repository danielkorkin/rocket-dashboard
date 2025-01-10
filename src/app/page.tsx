"use client";

import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DataProvider } from "../components/DataProvider";
import WidgetContainer from "../components/WidgetContainer";
import AddWidgetButton from "../components/AddWidgetButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayouts = {
	lg: [
		{ i: "video", x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
		{ i: "speed", x: 6, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "altitude", x: 8, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "gforce", x: 10, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "speedChart", x: 0, y: 4, w: 4, h: 3, minW: 3, minH: 2 },
		{ i: "gforceChart", x: 4, y: 4, w: 4, h: 3, minW: 3, minH: 2 },
		{ i: "altitudeChart", x: 8, y: 4, w: 4, h: 3, minW: 3, minH: 2 },
		{ i: "rollRate", x: 0, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "heading", x: 2, y: 7, w: 4, h: 2, minW: 3, minH: 2 },
		{ i: "clock", x: 6, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "temperature", x: 8, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
		{ i: "timer", x: 10, y: 7, w: 2, h: 2, minW: 2, minH: 2 },
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
		{ id: "rollRate", type: "rollRate", title: "Roll Rate" },
		{ id: "heading", type: "heading", title: "Heading" },
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

	const onLayoutChange = (layout, layouts) => {
		setLayouts(layouts);
	};

	const addWidget = (widgetType) => {
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
	};

	const removeWidget = (widgetId) => {
		setWidgets(widgets.filter((widget) => widget.id !== widgetId));
		setLayouts({
			...layouts,
			lg: layouts.lg.filter((item) => item.i !== widgetId),
		});
	};

	const updateWidget = (widgetId, newProps) => {
		setWidgets(
			widgets.map((widget) =>
				widget.id === widgetId ? { ...widget, ...newProps } : widget
			)
		);
	};

	return (
		<DataProvider>
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-4">
					Rocket Launch Dashboard
				</h1>
				<AddWidgetButton onAdd={addWidget} />
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
				>
					{widgets.map((widget) => (
						<div key={widget.id}>
							<WidgetContainer
								widget={widget}
								onRemove={() => removeWidget(widget.id)}
								onUpdate={(newProps) =>
									updateWidget(widget.id, newProps)
								}
							/>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		</DataProvider>
	);
}
