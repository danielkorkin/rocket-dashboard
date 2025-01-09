"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

const AddWidgetButton = ({ onAdd }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="mb-4">
					<Plus className="mr-2 h-4 w-4" /> Add Widget
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => onAdd("video")}>
					Video Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("gauge")}>
					Gauge Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("chart")}>
					Chart Widget
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AddWidgetButton;
