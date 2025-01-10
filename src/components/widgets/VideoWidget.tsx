"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface VideoWidgetProps {
	videoUrl?: string;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({
	videoUrl = "https://www.youtube.com/watch?v=21X5lGlDOfg",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({
		width: "100%",
		height: "100%",
	});

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				setDimensions({
					width: `${containerRef.current.offsetWidth}px`,
					height: `${containerRef.current.offsetHeight}px`,
				});
			}
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);

		const resizeObserver = new ResizeObserver(updateDimensions);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => {
			window.removeEventListener("resize", updateDimensions);
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div ref={containerRef} className="w-full h-full">
			{typeof window !== "undefined" && (
				<ReactPlayer
					url={videoUrl}
					width={dimensions.width}
					height={dimensions.height}
					controls
					style={{ position: "absolute", top: 0, left: 0 }}
				/>
			)}
		</div>
	);
};

export default VideoWidget;
