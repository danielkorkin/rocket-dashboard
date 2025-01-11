"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DataSetupProps {
	initialUrl?: string;
	onSave: (url: string) => void;
}

export function DataSetup({ initialUrl = "", onSave }: DataSetupProps) {
	const [url, setUrl] = useState(initialUrl || ""); // Ensure initial value is always a string
	const [open, setOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(url.trim()); // Trim whitespace
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Data Setup</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Data Setup</DialogTitle>
					<DialogDescription>
						Configure the base WebSocket URL to receive live data
						from rockets.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="base-url" className="text-right">
								Base URL
							</Label>
							<Input
								id="base-url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="ws://localhost:5000"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
