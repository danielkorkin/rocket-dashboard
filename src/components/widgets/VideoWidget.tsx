"use client";

import React from "react";
import ReactPlayer from "react-player";

const VideoWidget = ({
	videoUrl = "https://www.youtube.com/watch?v=21X5lGlDOfg",
}) => {
	return (
		<div className="w-full h-full">
			<ReactPlayer url={videoUrl} width="100%" height="100%" controls />
		</div>
	);
};

export default VideoWidget;
