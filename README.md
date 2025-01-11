This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# WebSocket Guide for Rocket Launch Dashboard

This guide explains how to set up WebSocket servers for the Rocket Launch Dashboard. Each data type (speed, altitude, gForce, rollRate, heading, and temperature) should have its own WebSocket server.

## WebSocket Server Setup

For each data type, create a WebSocket server that listens on `ws://localhost:8080/[dataKey]`. Here's an example using Node.js and the `ws` library:

```javascript
const WebSocket = require("ws");

function createWebSocketServer(dataKey, port) {
	const wss = new WebSocket.Server({ port });

	wss.on("connection", (ws) => {
		console.log(`Client connected to ${dataKey} WebSocket`);

		// Simulate data updates
		const interval = setInterval(() => {
			const data = {
				value: Math.random() * 100, // Replace with actual data generation logic
				timestamp: new Date().toISOString(),
			};
			ws.send(JSON.stringify(data));
		}, 1000);

		ws.on("close", () => {
			console.log(`Client disconnected from ${dataKey} WebSocket`);
			clearInterval(interval);
		});
	});

	console.log(
		`${dataKey} WebSocket server running on ws://localhost:${port}`
	);
}

// Create WebSocket servers for each data type
createWebSocketServer("speed", 8080);
createWebSocketServer("altitude", 8081);
createWebSocketServer("gForce", 8082);
createWebSocketServer("rollRate", 8083);
createWebSocketServer("heading", 8084);
createWebSocketServer("temperature", 8085);
```

## Data Format

Each WebSocket server should send data in the following JSON format:

```json
{
	"value": 42.5,
	"timestamp": "2023-05-20T12:34:56.789Z"
}
```

-   `value`: The current value of the data point (number)
-   `timestamp`: The ISO 8601 formatted timestamp of the data point (string)

## Status Codes and Error Handling

WebSockets use the following status codes:

1. 1000: Normal closure
2. 1001: Going away (server shutting down)
3. 1002: Protocol error
4. 1003: Unsupported data
5. 1006: Abnormal closure (connection lost)
6. 1007: Invalid frame payload data
7. 1008: Policy violation
8. 1009: Message too big
9. 1010: Mandatory extension
10. 1011: Internal server error

The DataProvider component in the dashboard handles these codes as follows:

-   On normal closure (1000) or abnormal closure (1006), it attempts to reconnect after 5 seconds.
-   For other error codes, it logs the error and attempts to reconnect after 5 seconds.

## Security Considerations

For a production environment, consider the following security measures:

1. Use WSS (WebSocket Secure) instead of WS
2. Implement authentication for WebSocket connections
3. Validate and sanitize incoming data
4. Implement rate limiting to prevent DoS attacks

Remember, this guide is for local development purposes. In a production environment, you would need to implement proper security measures and error handling.
