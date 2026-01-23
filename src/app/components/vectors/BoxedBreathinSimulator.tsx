/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Sound } from "@/types/Sound";
import React, { RefObject, useEffect, useRef, useState } from "react";

import SoundSelection from "../SoundSelection";
import timify from "@/utils/timify";

const breathingIntervalInSeconds = 1000;

const breathingInstructions = ["Breathe In", "Hold", "Breathe Out", "Hold "];
const BoxedBreathinSimulator = () => {
	const dotRef = useRef<HTMLSpanElement>(null) as RefObject<HTMLSpanElement>;
	const boxRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
	const [counter, setCounter] = useState({
		count: (4 * 4 * breathingIntervalInSeconds) / 1000,
	});
	const [breathingInstruction, setBreathingInstruction] = useState("");
	const timeouts = useRef<{
		counter?: NodeJS.Timeout;
		breathingInstruction?: NodeJS.Timeout;
	}>({});
	const [showFinishMessage, setShowFinishMessage] = useState(false);
	const [selectedSound, setSelectedSound] = useState<Sound | undefined>();

	useEffect(() => {
		if (localStorage.getItem("resetting") === "true") {
			return;
		}
		if (
			counter.count === 0 ||
			counter.count === (4 * 4 * breathingIntervalInSeconds) / 1000
		) {
			if (counter.count === 0) {
				setCounter({
					count: (4 * 4 * breathingIntervalInSeconds) / 1000,
				});
				setShowFinishMessage(true);
			}
			return;
		}

		timeouts.current = {
			...timeouts,
			counter: setTimeout(() => {
				if (localStorage.getItem("resetting") === "true") {
					return;
				}
				setCounter({ count: counter.count - 1 });
			}, 1000),
		};
	}, [counter]);

	useEffect(() => {
		if (breathingInstruction === "") {
			return;
		}
		timeouts.current = {
			...timeouts.current,
			breathingInstruction: setTimeout(() => {
				if (localStorage.getItem("resetting") === "true") {
					setBreathingInstruction("");
					setTimeout(() => {
						localStorage.setItem("resetting", "true");
					}, 2);
					return;
				}
				if (counter.count <= breathingIntervalInSeconds / 1000) {
					setBreathingInstruction("");
					return;
				}
				setBreathingInstruction(
					breathingInstruction === ""
						? breathingInstructions[0]
						: breathingInstructions[
								(breathingInstructions.indexOf(
									breathingInstruction,
								) +
									1) %
									4
							],
				);
			}, breathingIntervalInSeconds),
		};
	}, [breathingInstruction]);

	const handleStartClick = () => {
		localStorage.setItem("resetting", "false");
		if (!dotRef.current) {
			return;
		}

		setTimeout(() => {
			setCounter({ count: counter.count - 1 });
		}, 1000);

		setBreathingInstruction(breathingInstructions[0]);
		const now = new Date().getTime();
		selectedSound?.audio?.play();
		moveDot(now);
	};

	const handleReset = () => {
		localStorage.setItem("resetting", "true");

		clearTimeout(timeouts.current.breathingInstruction);
		clearTimeout(timeouts.current.counter);
		setTimeout(() => {
			setCounter({
				count: (4 * 4 * breathingIntervalInSeconds) / 1000,
			});
			setBreathingInstruction("");
			dotRef.current.style.left = "0";
			dotRef.current.style.top = "0";
		}, 10);
		selectedSound!.audio!.pause();
		selectedSound!.audio!.currentTime = 0;
	};

	const moveDot = (startTime: number) => {
		if (localStorage.getItem("resetting") === "true") {
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
								delta / breathingIntervalInSeconds,
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
								delta / breathingIntervalInSeconds,
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
									delta / breathingIntervalInSeconds,
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
									delta / breathingIntervalInSeconds,
								) *
									breathingIntervalInSeconds);

					dotRef.current.style.top = `calc(${newY}px)`;
					break;
			}

			if (delta <= 4 * 4 * breathingIntervalInSeconds) {
				moveDot(startTime);
			} else if (selectedSound) {
				selectedSound!.audio!.pause();
				selectedSound!.audio!.currentTime = 0;
			}
		}, 1);
	};

	if (!showFinishMessage) {
		return (
			<>
				<div className="w-[88vw] max-w-[380px] mb-8">
					<div
						ref={boxRef}
						className="border-2 border-outline rounded-sm flex flex-col justify-center mb-6 py-8 relative"
					>
						<div className="bg-[#005B70] text-white w-[30vw] h-[30vw] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center  m-[0_auto]">
							<h1 className="text-sm font-medium">
								{breathingInstruction}
							</h1>
						</div>
						<span
							ref={dotRef}
							className="absolute block bg-blue-400 dark:bg-[lab(82_-26.68_-20.14)] w-5 h-5 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50"
						></span>
						{breathingInstruction !== "" && (
							<div className="text-sm font-medium border-2 border-outline dark:border-[#004e60] dark:bg-[#00383b] text-outline 0 py-1/2 px-3 rounded-sm absolute -top-4 -right-7 rotate-17 bg-white">
								{timify(counter.count)}
							</div>
						)}
					</div>
					{breathingInstruction === "" && (
						<button
							onClick={handleStartClick}
							className="w-full bg-primary hover:bg-primary-hover text-white rounded-[2px] h-10 uppercase font-medium cursor-pointer tracking-wide"
						>
							Start
						</button>
					)}
					{breathingInstruction !== "" && (
						<button
							onClick={handleReset}
							className="w-full border-2 dark:border-outline hover:bg-primary hover:text-onPrimary hover:border-transparent dark:hover:text-white rounded-xs py-1.5 uppercase font-medium text-center tracking-wide cursor-pointer "
						>
							Reset
						</button>
					)}
					<SoundSelection
						onSoundSelection={(sound) => {
							if (
								selectedSound &&
								selectedSound.audio?.currentTime !== 0
							) {
								selectedSound.audio?.pause();
								selectedSound.audio!.currentTime = 0;
								sound.audio?.play();
							}
							setSelectedSound(sound);
						}}
					/>
				</div>
			</>
		);
	}

	return (
		<div className="mt-12">
			<h1 className="text-xl font-medium text-center mb-5">
				Still feeling stressed?
			</h1>
			<div className="flex flex-col justify-center items-center gap-y-4">
				<a
					onClick={() => setShowFinishMessage(false)}
					className="w-52 h-10 rounded-sm bg-primary hover:bg-primary-hover text-onPrimary text-sm  hover:cursor-pointer flex justify-center items-center"
				>
					Redo the exercise
				</a>
				<a
					href="/alternatives"
					className="w-52 h-10 hover:bg-secondary hover:text-onPrimary hover:border-none rounded-sm border-2 text-[13.5px] font-medium hover:cursor-pointer flex justify-center items-center"
				>
					Check other techniques
				</a>
			</div>
		</div>
	);
};

export default BoxedBreathinSimulator;
