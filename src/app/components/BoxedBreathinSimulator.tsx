/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Sound } from "@/types/Sound";
import Link from "next/link";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck, FiRotateCcw } from "react-icons/fi";

import SoundSelection from "./SoundSelection";
import SessionFooter from "./SessionFooter";
import timify from "@/utils/timify";

const breathingInstructions = ["Breathe In", "Hold", "Breathe Out", "Hold "];
const BoxedBreathinSimulator = () => {
	const breathingIntervalInSeconds = Number(
		process.env.NEXT_PUBLIC_BREATHING_INTERVAL_IN_SECONDS,
	);
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
				clearTimeout(timeouts.current.breathingInstruction);
				setBreathingInstruction("");
				selectedSound?.audio?.pause();
				if (selectedSound?.audio) selectedSound.audio.currentTime = 0;
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
		void selectedSound?.audio?.play().catch(() => {});
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
		selectedSound?.audio?.pause();
		if (selectedSound?.audio) selectedSound.audio.currentTime = 0;
	};

	const moveDot = (startTime: number) => {
		if (localStorage.getItem("resetting") === "true") {
			return;
		}

		setTimeout(() => {
			if (localStorage.getItem("resetting") === "true" || !dotRef.current || !boxRef.current) return;
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
							<p className="text-sm font-medium">
								{breathingInstruction}
							</p>
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
		<section
			aria-labelledby="session-complete-title"
			className="mb-8 w-full max-w-[380px] overflow-hidden rounded-2xl border border-outline/20 bg-surface shadow-[0_8px_32px_-20px_rgba(0,41,50,0.25)] dark:shadow-none"
		>
			<header className="px-6 pb-6 pt-7 text-center">
				<span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#e9f5f1] text-[#02713f] dark:bg-[#bffaff]/8 dark:text-[#bffaff]">
					<FiCheck size={23} strokeWidth={1.8} aria-hidden="true" />
				</span>
				<h2
					id="session-complete-title"
					className="text-2xl font-medium tracking-tight text-title"
				>
					Session complete.
				</h2>
				<p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-paragraph">
					Take a moment before continuing your day.
				</p>
			</header>
			<div className="flex flex-col gap-2 px-6 pb-6">
				<button
					type="button"
					onClick={() => setShowFinishMessage(false)}
					className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-onPrimary transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-arrow"
				>
					<FiRotateCcw size={16} aria-hidden="true" />
					Redo the exercise
				</button>
				<Link
					href="/alternatives"
					className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-paragraph transition-colors hover:bg-primary/5 hover:text-title focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arrow dark:hover:bg-white/5"
				>
					Check other techniques
					<FiArrowRight size={15} aria-hidden="true" />
				</Link>
			</div>
			<SessionFooter />
		</section>
	);
};

export default BoxedBreathinSimulator;
