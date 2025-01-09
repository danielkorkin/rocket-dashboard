"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DataProvider } from "../components/DataProvider";
import WidgetContainer from "../components/WidgetContainer";
import AddWidgetButton from "../components/AddWidgetButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayouts = {
	lg: [
		{ i: "video", x: 0, y: 0, w: 6, h: 4 },
		{ i: "speed", x: 6, y: 0, w: 2, h: 2 },
		{ i: "altitude", x: 8, y: 0, w: 2, h: 2 },
		{ i: "gforce", x: 10, y: 0, w: 2, h: 2 },
		{ i: "speedChart", x: 0, y: 4, w: 4, h: 3 },
		{ i: "gforceChart", x: 4, y: 4, w: 4, h: 3 },
		{ i: "altitudeChart", x: 8, y: 4, w: 4, h: 3 },
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
		},
		{
			id: "altitude",
			type: "gauge",
			title: "Current Altitude",
			dataKey: "altitude",
		},
		{
			id: "gforce",
			type: "gauge",
			title: "Current G Force",
			dataKey: "gForce",
		},
		{
			id: "speedChart",
			type: "chart",
			title: "Speed Chart",
			dataKey: "speed",
		},
		{
			id: "gforceChart",
			type: "chart",
			title: "G Force Chart",
			dataKey: "gForce",
		},
		{
			id: "altitudeChart",
			type: "chart",
			title: "Altitude Chart",
			dataKey: "altitude",
		},
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
			lg: [...layouts.lg, { i: newId, x: 0, y: 0, w: 4, h: 3 }],
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
