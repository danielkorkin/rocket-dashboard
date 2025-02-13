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

interface AddWidgetButtonProps {
	onAdd: (widgetType: string) => void;
	disabled?: boolean;
}

const AddWidgetButton: React.FC<AddWidgetButtonProps> = ({
	onAdd,
	disabled,
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="mb-4" disabled={disabled}>
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
				<DropdownMenuItem onSelect={() => onAdd("rollRate")}>
					Roll Rate Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("heading")}>
					Heading Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("clock")}>
					Live Clock Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("number")}>
					Number Widget
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onAdd("timer")}>
					Timer Widget
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AddWidgetButton;
