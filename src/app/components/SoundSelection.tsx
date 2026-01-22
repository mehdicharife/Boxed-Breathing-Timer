import { Sound } from "@/types/Sound";
import React, { useEffect, useState } from "react";
import { BsCloudRainFill } from "react-icons/bs";
import { FaCat, FaBrain } from "react-icons/fa";
import { GiBigWave, GiMusicalScore } from "react-icons/gi";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { MdArrowDropDown, MdForest } from "react-icons/md";

const initialSounds: Sound[] = [
	{
		name: "Binaural beats",
		description:
			"Binaural beats are an auditory illusion created when two slightly different frequencies are played separately into each ear, causing the brain to perceive a third tone that may promote relaxation by encouraging slower brainwave patterns associated with meditative and calm mental states.",
		icon: FaBrain,
		audioFileName: "binaural.wav",
	},
	{
		name: "Ocean waves",
		description:
			"Ocean wave sounds are a natural acoustic phenomenon produced by rhythmic water motion forming, traveling, and breaking along shorelines, generating low-frequency rumbling (20-100 Hz) combined with broadband noise that has been associated with reduced stress and improved sleep through ambient sound masking and rhythmic pattern synchronization.",
		icon: GiBigWave,
		audioFileName: "ocean-waves.mp3",
	},

	{
		name: "Cat purring sounds",
		description:
			"Cat purring sounds are a low-frequency, rhythmic vocalization produced by oscillation of the laryngeal muscles and diaphragm, creating a continuous rumbling tone between 25-50 Hz that has been associated with calming effects and therapeutic benefits in both cats and humans.",
		icon: FaCat,
		audioFileName: "purring.mp3",
	},

	{
		name: "Forest sounds",
		description:
			"Forest sounds encompass diverse natural audio sources including bird calls, rustling leaves, and flowing water, producing mid-to-high frequency tones (1-8 kHz) with irregular patterns that have been associated with reduced cortisol and enhanced parasympathetic activity through exposure to complex natural soundscapes.",
		icon: MdForest,
		audioFileName: "forest.mp3",
	},

	{
		name: "Rain sounds",
		description:
			"Rain sounds are created by water droplets striking surfaces, producing broadband frequencies (250 Hz-2 kHz) with steady patterns that have been associated with improved sleep and relaxation through ambient noise masking.",
		icon: BsCloudRainFill,
		audioFileName: "rain.mp3",
	},
];

const SoundSelection = ({
	onSoundSelection,
}: {
	onSoundSelection: (sound: Sound) => void;
}) => {
	const [sounds, setSounds] = useState(initialSounds);
	const [soundSelectionVisible, setSoundSelectionVisible] = useState(false);
	const [selectedSound, setSelectedSound] = useState<Sound | undefined>();

	useEffect(() => {
		setSounds(
			sounds.map((sound) => ({
				...sound,
				audio: new Audio(`/audio/${sound.audioFileName}`),
			})),
		);
	}, []);

	const handleSoundSelection = (sound: Sound) => {
		setSelectedSound(sound);
		setSoundSelectionVisible(false);
		onSoundSelection(sound);
	};

	return (
		<div className="relative">
			<button
				className="w-full border-2  py-1.5 px-2 flex justify-between items-center hover:border-outline-hover mt-4 mb-3 cursor-pointer"
				onClick={() =>
					setSoundSelectionVisible(!soundSelectionVisible)
				}
			>
				{!selectedSound ? (
					<>
						<GiMusicalScore size="21" />
						<p className="text-[13px]">Select a sound</p>
					</>
				) : (
					<>
						{selectedSound.audio?.currentTime === 0 ? (
							<selectedSound.icon
								size="21"
								className="shrink-0"
							/>
						) : (
							<button
								title="pause"
								className="cursor-pointer hover:text-outline"
								onClick={(event) => {
									if (!selectedSound.audio!.paused) {
										selectedSound.audio!.pause();
									} else {
										selectedSound.audio!.play();
									}
									event.stopPropagation();
								}}
							>
								{selectedSound?.audio!.paused ? (
									<IoPlay />
								) : (
									<IoMdPause />
								)}
							</button>
						)}
						<p className="text-[13px]">
							{selectedSound.name}
						</p>
					</>
				)}

				<MdArrowDropDown size="22" />
			</button>
			<div
				className={`flex flex-col bg-[#EBF7F8] dark:bg-[#1f3638] rounded-sm shadow-[4px_4px_6px_2px_rgba(0,_0,_0,_0.1)] absolute z-50 max-h-[220px] overflow-y-scroll ${soundSelectionVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-400`}
			>
				{sounds.map((sound) => (
					<button
						className="flex py-2 px-2 gap-x-4 bg-[#EBF7F8] dark:bg-[#1f3638] hover:bg-[#c0ecf1] dark:hover:bg-[#1a2d2f] hover:cursor-pointer"
						onClick={() => handleSoundSelection(sound)}
						key={sound.name}
					>
						<sound.icon size="20" className="shrink-0" />
						<div className="text-left">
							<h5 className="text-[13px] font-medium mb-1 text-title">
								{sound.name}
							</h5>
							<p className="text-xs">
								{sound.description}
							</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default SoundSelection;
