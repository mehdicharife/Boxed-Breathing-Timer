"use client";

import React, { useEffect, useState } from "react";
import Moon from "./vectors/Moon";


const DarkModeSwitchButton = () => {
	const [htmlElement, setHtmlElement] = useState<HTMLElement | undefined>();

	useEffect(() => {
		setHtmlElement(document.documentElement);
	}, []);

	const handleClick = () => {
		if (!htmlElement) {
			return;
		}
		if (!htmlElement.classList.contains("dark")) {
			htmlElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			htmlElement.classList.remove("dark");
			localStorage.setItem("theme", "white");
		}
	};
	return (
		<button
			onClick={handleClick}
			title="switch mode"
			className="absolute left-10 hover:cursor-pointer"
		>
			<Moon size={37} />
		</button>
	);
};

export default DarkModeSwitchButton;
