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
import { useData } from "./DataProvider";

export function DataSetup({
	baseUrl,
	setBaseUrl,
}: {
	baseUrl: string;
	setBaseUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setBaseUrl(baseUrl);
	};

	return (
		<Dialog>
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
								value={baseUrl}
								onChange={(e) => setBaseUrl(e.target.value)}
								placeholder="ws://localhost:5000"
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
				<div className="mt-4">
					<h4 className="text-sm font-medium">Instructions:</h4>
					<ol className="list-decimal list-inside text-sm">
						<li>Ensure your local WebSocket server is running</li>
						<li>
							Enter the base WebSocket URL (e.g.,
							ws://localhost:5000)
						</li>
						<li>Click "Save changes" to connect</li>
						<li>
							The dashboard will now receive live data from the
							WebSockets
						</li>
					</ol>
				</div>
			</DialogContent>
		</Dialog>
	);
}
