"use client";

import React, { useEffect, useRef, useState } from "react";

const breathingIntervalInSeconds = 1000;

const clockify = (number: number) => (number < 10 ? "0" + number : number + "");
const timify = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;

	return `${clockify(minutes)}:${clockify(secs)}`;
};

const breathingInstructions = ["Breathe In", "Hold", "Breathe Out", "Hold "];
const BoxedBreathinSimulator = () => {
	const dotRef = useRef<HTMLSpanElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	const [counter, setCounter] = useState({
		count: (4 * 4 * breathingIntervalInSeconds) / 1000,
	});
	const [breathingInstruction, setBreathingInstruction] = useState("");
	const [resetting, setResetting] = useState(false);

	useEffect(() => {
		if (
			counter.count === 0 ||
			counter.count === (4 * 4 * breathingIntervalInSeconds) / 1000
		) {
			return;
		}

		setTimeout(() => {
			setCounter({ count: counter.count - 1 });
		}, 1000);
	}, [counter]);

	useEffect(() => {
		if (breathingInstruction === "") {
			return;
		}
		if (counter.count === 0) {
			setBreathingInstruction("");
			return;
		}
		setTimeout(() => {
			setBreathingInstruction(
				breathingInstruction === ""
					? breathingInstructions[0]
					: breathingInstructions[
							(breathingInstructions.indexOf(
								breathingInstruction
							) +
								1) %
								4
					  ]
			);
		}, breathingIntervalInSeconds);
	}, [breathingInstruction]);

	const handleStartClick = () => {
		if (!dotRef.current) {
			return;
		}

		setTimeout(() => {
			setCounter({ count: counter.count - 1 });
		}, 1000);

		setBreathingInstruction(breathingInstructions[0]);
		const now = new Date().getTime();
		moveDot(now);
	};

	const handleReset = () => {
		setResetting(true);

		setTimeout(() => {
			setResetting(false);
		}, 100000);

		setTimeout(() => {
			setCounter({
				count: (4 * 4 * breathingIntervalInSeconds) / 1000,
			});
			setBreathingInstruction("");
			dotRef.current.style.left = 0;
			dotRef.current.style.top = 0;
		}, 1300);
	};

	const moveDot = (startTime: number) => {
		console.log(resetting);
		if (resetting) {
			return;
		}

		setTimeout(() => {
			let newX, newY;
			const delta = new Date().getTime() - startTime;
			switch (Math.floor(delta / breathingIntervalInSeconds) % 4) {
				case 0:
					newX =
						(boxRef.current?.getBoundingClientRect().width /
							Math.floor(breathingIntervalInSeconds)) *
						(delta -
							Math.floor(
								delta / breathingIntervalInSeconds
							) *
								breathingIntervalInSeconds);

					dotRef.current.style.left = `calc(${newX}px)`;

					break;
				case 1:
					newY =
						(boxRef.current?.getBoundingClientRect().height /
							Math.floor(breathingIntervalInSeconds)) *
						(delta -
							Math.floor(
								delta / breathingIntervalInSeconds
							) *
								breathingIntervalInSeconds);

					dotRef.current.style.top = `calc(${newY}px)`;
					break;
				case 2:
					newX =
						boxRef.current?.getBoundingClientRect().width -
						(boxRef.current?.getBoundingClientRect().width /
							Math.floor(breathingIntervalInSeconds)) *
							(delta -
								Math.floor(
									delta / breathingIntervalInSeconds
								) *
									breathingIntervalInSeconds);

					dotRef.current.style.left = `calc(${newX}px)`;

					break;
				case 3:
					newY =
						boxRef.current?.getBoundingClientRect().height -
						(boxRef.current?.getBoundingClientRect().height /
							Math.floor(breathingIntervalInSeconds)) *
							(delta -
								Math.floor(
									delta / breathingIntervalInSeconds
								) *
									breathingIntervalInSeconds);

					dotRef.current.style.top = `calc(${newY}px)`;
					break;
			}

			if (delta <= 4 * 4 * breathingIntervalInSeconds) {
				moveDot(startTime);
			}
		}, 1);
	};
	return (
		<>
			<div
				className="border-2 border-blue-950 rounded-sm flex flex-col justify-center mb-8 py-8 relative"
				ref={boxRef}
			>
				<div className="bg-[#005B70] text-white w-[110px] h-[110px] rounded-full flex items-center justify-center  m-[0_auto]">
					<h1 className="text-sm font-medium">
						{breathingInstruction}
					</h1>
				</div>
				<span
					ref={dotRef}
					className="absolute block bg-blue-400 w-5 h-5 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50"
				></span>
				{counter.count !== 0 && (
					<div className="text-sm font-medium border-2 border-blue-800 py-1/2 px-3 rounded-sm absolute -top-4 -right-7 rotate-17 bg-white">
						{timify(counter.count)}
					</div>
				)}
			</div>
			<div className="flex items-center justify-center gap-x-6 text-sm">
				<button className="border-2 border-[#004E60] rounded-[2px] w-26 h-10 font-medium text-center cursor-pointer">
					Pause
				</button>
				<button
					onClick={handleStartClick}
					className="bg-[#022932] text-white rounded-[2px] w-26 h-10 font-medium text-center cursor-pointer"
				>
					Start
				</button>
				<button
					onClick={handleReset}
					className="border-2 border-[#004E60] rounded-[2px] w-26 h-10 font-medium text-center cursor-pointer"
				>
					Reset
				</button>
			</div>
		</>
	);
};

export default BoxedBreathinSimulator;
