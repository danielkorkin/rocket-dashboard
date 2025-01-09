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
							widget.type === "chart") && (
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
