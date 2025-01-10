"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const DataSetupPage: React.FC = () => {
	const [websocketUrl, setWebsocketUrl] = useState("");
	const { toast } = useToast();

	const handleConnect = () => {
		// Here you would implement the logic to connect to the WebSocket
		// For now, we'll just show a toast notification
		toast({
			title: "WebSocket Connection",
			description: `Attempting to connect to: ${websocketUrl}`,
		});
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Data Setup</h1>
			<Card>
				<CardHeader>
					<CardTitle>WebSocket Configuration</CardTitle>
					<CardDescription>
						Enter the WebSocket URL to receive live data from
						rockets
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="websocketUrl">WebSocket URL</Label>
							<Input
								id="websocketUrl"
								placeholder="ws://example.com/rocket-data"
								value={websocketUrl}
								onChange={(e) =>
									setWebsocketUrl(e.target.value)
								}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleConnect}>Connect</Button>
				</CardFooter>
			</Card>
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-2">Instructions</h2>
				<ol className="list-decimal list-inside space-y-2">
					<li>
						Ensure your rocket's telemetry system is configured to
						send data over WebSocket.
					</li>
					<li>
						Enter the WebSocket URL provided by your rocket's
						telemetry system in the input field above.
					</li>
					<li>
						Click the "Connect" button to establish a connection.
					</li>
					<li>
						Once connected, the dashboard will automatically update
						with live data from your rocket.
					</li>
					<li>
						If the connection is lost, the dashboard will fall back
						to simulated data.
					</li>
				</ol>
			</div>
		</div>
	);
};

export default DataSetupPage;
