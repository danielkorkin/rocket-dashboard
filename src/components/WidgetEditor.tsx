"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const WidgetEditor = ({ widget, onUpdate, onCancel }) => {
	const [editedWidget, setEditedWidget] = useState({ ...widget });

	const handleChange = (e) => {
		setEditedWidget({ ...editedWidget, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdate(editedWidget);
	};

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Widget</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								id="title"
								name="title"
								value={editedWidget.title}
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>
						{widget.type === "video" && (
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="videoUrl"
									className="text-right"
								>
									Video URL
								</Label>
								<Input
									id="videoUrl"
									name="videoUrl"
									value={editedWidget.videoUrl}
									onChange={handleChange}
									className="col-span-3"
								/>
							</div>
						)}
						{(widget.type === "gauge" ||
							widget.type === "chart" ||
							widget.type === "number") && (
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="dataKey" className="text-right">
									Data Key
								</Label>
								<Input
									id="dataKey"
									name="dataKey"
									value={editedWidget.dataKey}
									onChange={handleChange}
									className="col-span-3"
								/>
							</div>
						)}
						{widget.type === "clock" && (
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="timezone"
									className="text-right"
								>
									Timezone
								</Label>
								<Select
									value={editedWidget.timezone}
									onValueChange={(value) =>
										setEditedWidget({
											...editedWidget,
											timezone: value,
										})
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select timezone" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="UTC">UTC</SelectItem>
										<SelectItem value="America/New_York">
											Eastern Time
										</SelectItem>
										<SelectItem value="America/Chicago">
											Central Time
										</SelectItem>
										<SelectItem value="America/Denver">
											Mountain Time
										</SelectItem>
										<SelectItem value="America/Los_Angeles">
											Pacific Time
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}
						{widget.type === "timer" && (
							<>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="startDate"
										className="text-right"
									>
										Start Date
									</Label>
									<Input
										id="startDate"
										name="startDate"
										type="date"
										value={editedWidget.startDate}
										onChange={handleChange}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="startTime"
										className="text-right"
									>
										Start Time
									</Label>
									<Input
										id="startTime"
										name="startTime"
										type="time"
										step="0.001"
										value={editedWidget.startTime}
										onChange={handleChange}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="timerTimezone"
										className="text-right"
									>
										Timezone
									</Label>
									<Input
										id="timerTimezone"
										name="timerTimezone"
										value={editedWidget.timerTimezone}
										onChange={handleChange}
										className="col-span-3"
									/>
								</div>
							</>
						)}
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default WidgetEditor;
