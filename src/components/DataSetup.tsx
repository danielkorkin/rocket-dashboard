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

export function DataSetup() {
	const { setWebSocketUrl } = useData();
	const [url, setUrl] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setWebSocketUrl(url);
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
						Configure the WebSocket connection to receive live data
						from rockets.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label
								htmlFor="websocket-url"
								className="text-right"
							>
								WebSocket URL
							</Label>
							<Input
								id="websocket-url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="ws://localhost:8080"
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
							Enter the WebSocket URL (e.g., ws://localhost:8080)
						</li>
						<li>Click "Save changes" to connect</li>
						<li>
							The dashboard will now receive live data from the
							WebSocket
						</li>
					</ol>
				</div>
			</DialogContent>
		</Dialog>
	);
}
