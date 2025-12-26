"use client";

import React, { useEffect, useState } from "react";
import Moon from "./vectors/Moon";

const DarkModeSwitchButton = () => {
	const [body, setBody] = useState<HTMLElement | undefined>();

	useEffect(() => {
		setBody(document.body);
	}, []);

	const handleClick = () => {
		if (!body) {
			return;
		}
		if (!body.classList.contains("dark")) {
			body.classList.add("dark");
		} else {
			body.classList.remove("dark");
		}
	};
	return (
		<button onClick={handleClick} className="absolute left-10 hover:cursor-pointer">
			<Moon size={37} />
		</button>
	);
};

export default DarkModeSwitchButton;
