import React from "react";
import SighIcon from "../components/vectors/Sigh";
import BinauralBeatsIcon from "../components/vectors/BinauralBeatsIcon";
import ColdExposureIcon from "../components/vectors/ColdExposureIcon";
import HummingIcon from "../components/vectors/HummingIcon";
import BilateralStimulationIcon from "../components/vectors/BilateralStimulationIcon";
import AlternativeCard, { Alternative } from "../components/AlternativeCard";
import AlternativeSection from "../components/AlternativeSection";
import { GoAlert } from "react-icons/go";
import { createPageMetadata } from "../social-metadata";

export const metadata = createPageMetadata({
	title: "Stress-Relief Alternatives | Boxed Breathing Timer",
	description:
		"Explore physiological sighs, humming, calming sounds, bilateral stimulation, and other real-time stress-relief techniques.",
	pathname: "/alternatives",
});

const alternatives: Alternative[] = [
	{
		name: "The Physiological Sigh",
		icon: SighIcon,
		description: {
			p1: "The physiological sigh is a natural breathing pattern—two quick inhales followed by a long exhale—that reinflates air sacs in your lungs. Your body does this automatically throughout the day to maintain optimal oxygen exchange.",
			p2: "You can use this pattern intentionally to reduce stress fast. Take two inhales through your nose, then exhale slowly through your mouth. This activates your relaxation response and restores calm within seconds.",
		},
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "physiological-sigh",
	},
	{
		name: "Cold Exposure",
		icon: ColdExposureIcon,
		description: {
			p1: "Cold exposure is a powerful tool for interrupting stress responses in real time. When combined with breath holding, cold water on your face activates the diving reflex—an ancient mammalian response that immediately slows your heart rate and shifts your nervous system toward calm.",
			p2: "Before trying this technique, note that it's not suitable for those with heart, respiratory, or circulatory conditions, and should never be practiced in deep water. To use cold exposure: fill a bowl with ice-cold water, take a breath, and submerge your face for 15-30 seconds while holding your breath. The cold water triggers an automatic drop in heart rate and blood pressure, breaking the cycle of panic or acute stress. This technique provides one of the fastest physiological ways to regain control when overwhelmed.",
		},
		cardWidth: "90",
		cardHeight: "110",
		sectionId: "cold-exposure",
	},
	{
		name: "Binaural Beats",
		icon: BinauralBeatsIcon,
		description: {
			p1: "Binaural beats are an auditory phenomenon that occurs when you hear two slightly different frequencies in each ear through headphones. Your brain perceives a third rhythmic beat at the difference between these frequencies, which can influence your brainwave patterns and mental state.",
			p2: "Listen to binaural beats in the alpha range (8-14 Hz) or theta range (4-8 Hz) through headphones for 10-15 minutes to promote relaxation. The rhythmic pulse encourages your brainwaves to synchronize with calming frequencies, reducing stress and anxiety. This passive technique works well during meditation, rest, or any time you need to quiet a busy mind.",
		},
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "binaural-beats",
	},
	{
		name: "Humming",
		icon: HummingIcon,
		description: {
			p1: "Humming is a simple vocal practice that creates vibrations throughout your head, chest, and body. These vibrations, combined with the extended exhale required for humming, activate your vagus nerve and trigger your body's natural relaxation response.",
			p2: "Take a breath in through your nose, then hum on the exhale for as long as comfortable, keeping your lips closed and jaw relaxed. The vibrations and slow breathing pattern signal safety to your nervous system, lowering heart rate and reducing stress. Practice for just a few minutes to feel more grounded and centered during moments of tension.",
		},
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "humming",
	},
	{
		name: "Bilateral Stimulation",
		icon: BilateralStimulationIcon,
		description: {
			p1: "Bilateral stimulation involves alternating sensory input between the left and right sides of your body, such as through tapping, eye movements, or sound. This rhythmic, side-to-side pattern engages both brain hemispheres and helps process emotions while calming the nervous system.",
			p2: "Gently tap your knees or shoulders in an alternating left-right pattern, or move your eyes slowly side to side while focusing on a stressful thought or feeling. The bilateral rhythm helps your brain reprocess distressing emotions and reduces their intensity. Practice for 1-2 minutes whenever you feel overwhelmed or need to work through difficult feelings.",
		},
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "bilateral-stimulation",
	},
];

const page = () => {
	return (
		<div className=" [&_svg]:filter-[brightness(0)_saturate(100%)_invert(19%)_sepia(9%)_saturate(1607%)_hue-rotate(140deg)_brightness(86%)_contrast(87%)] [&_svg]:dark:filter-[brightness(0)_saturate(100%)_invert(67%)_sepia(23%)_saturate(475%)_hue-rotate(135deg)_brightness(100%)_contrast(94%)]">
			<div className="w-full py-2 px-2 flex justify-between bg-[#b7eaf5] dark:bg-[rgb(229_251_255)] dark:text-[#1c4650] mb-4">
				<div className="flex justify-center gap-x-2 cursor-pointer">
					<div className="flex  gap-x-2">
						<p className="text-xs font-medium">
							<GoAlert
								size="13"
								className="!filter-none dark:text-[#1c4650] stroke-1 inline mr-1.5"
							/>
							<span className="font-bold">Disclaimer</span>
							: This information is not medical advice.
							Consult a healthcare provider before trying
							these techniques, especially if you have
							existing health conditions. Stop immediately
							if you feel unwell.
						</p>
					</div>
				</div>
			</div>

			<div className="w-[88vw] max-w-[50ch] m-auto mb-10 text-center ">
				<h1 className="text-2xl text-title font-bold mb-3">
					Alternative real time techniques for combating stress
					and anxiety
				</h1>
				<p className="text-sm font-normal">
					While boxed breathing provides an accessible, real-time
					stress management tool, research has demonstrated
					comparable benefits from alternative techniques.
				</p>
			</div>

			<div className="w-full flex flex-wrap gap-x-10 gap-y-10  justify-center m-auto mb-24 [&>p]:text-[#003743] [&>a]:shrink-0 [&_a]:hover:bg-[#d6e1e4] [&_a]:hover:dark:bg-[#234c5e] [&_a]:hover:border-none [&_svg]:filter-[brightness(0)_saturate(100%)_invert(19%)_sepia(9%)_saturate(1607%)_hue-rotate(140deg)_brightness(86%)_contrast(87%)] [&_svg]:dark:filter-[brightness(0)_saturate(100%)_invert(67%)_sepia(23%)_saturate(475%)_hue-rotate(135deg)_brightness(100%)_contrast(94%)]">
				{alternatives.map((alternative) => (
					<AlternativeCard
						alternative={alternative}
						key={alternative.name}
					/>
				))}
			</div>

			{alternatives.map((alternative, index) => (
				<AlternativeSection
					alternative={alternative}
					dir={index % 2 == 0 ? "lr" : "rl"}
					key={alternative.name}
				/>
			))}
		</div>
	);
};

export default page;
