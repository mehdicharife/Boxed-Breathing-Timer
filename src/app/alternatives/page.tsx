import React from "react";
import Link from "next/link";
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
			p1: "Sighs are a normal breathing behaviour that help prevent the gradual collapse of small air sacs in the lungs. A physiological-sigh practice uses two comfortable inhales followed by a longer, unforced exhale.",
			p2: "Brief structured breathing practices, including cyclic sighing, have been studied for mood and physiological arousal. You can try one gentle cycle when it feels comfortable, then return to normal breathing. Stop if you feel light-headed or unwell.",
		},
		sources: [
			{
				label: "The psychophysiology of the sigh: physiological functions",
				href: "https://pubmed.ncbi.nlm.nih.gov/35288214/",
			},
			{
				label: "Brief structured respiration practices: randomized study",
				href: "https://pubmed.ncbi.nlm.nih.gov/36630953/",
			},
		],
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "physiological-sigh",
	},
	{
		name: "Cold Exposure",
		icon: ColdExposureIcon,
		description: {
			p1: "Cold facial cooling and breath holding can trigger a diving response that affects heart rate and blood-vessel activity. The response varies between people and is not simply a calming effect; cold exposure can also raise heart rate and blood pressure.",
			p2: "Because cold exposure and breath holding can place stress on the cardiovascular system, do not use this as a treatment for panic or anxiety. Avoid submerging your face or holding your breath in water, never practise in deep water or alone, and speak with a healthcare professional first if you have a heart, respiratory, or circulatory condition.",
		},
		sources: [
			{
				label: "Review: facial cooling, breath holding, and cardiovascular responses",
				href: "https://pubmed.ncbi.nlm.nih.gov/39846562/",
			},
			{
				label: "Review: cold-water immersion and autonomic conflict",
				href: "https://pubmed.ncbi.nlm.nih.gov/22547634/",
			},
		],
		cardWidth: "90",
		cardHeight: "110",
		sectionId: "cold-exposure",
	},
	{
		name: "Binaural Beats",
		icon: BinauralBeatsIcon,
		description: {
			p1: "Binaural beats are an auditory illusion created when slightly different tones are presented separately to each ear, usually with headphones. The perceived beat is the difference between the two tones.",
			p2: "Studies suggest binaural beats may reduce anxiety in some clinical settings, but the best frequency, duration, and mechanism are not established. If you enjoy them, treat them as optional background audio for rest or meditation—not as a treatment for anxiety or another health condition.",
		},
		sources: [
			{
				label: "Systematic review: binaural beats and brain oscillatory activity",
				href: "https://pubmed.ncbi.nlm.nih.gov/37205669/",
			},
			{
				label: "Systematic review and meta-analysis: perioperative anxiety and pain",
				href: "https://pubmed.ncbi.nlm.nih.gov/41176178/",
			},
		],
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "binaural-beats",
	},
	{
		name: "Humming",
		icon: HummingIcon,
		description: {
			p1: "Humming is a gentle vocal practice that lengthens an exhale and produces a vibration. It also changes airflow through the nose and sinuses. Small studies of Bhramari-style humming have examined heart-rate variability, but the overall evidence is limited.",
			p2: "If it feels comfortable, inhale gently and hum during an easy exhale with a relaxed jaw. Use it as a moment to notice your breathing rather than expecting a specific effect on heart rate, stress, or the vagus nerve. Stop if it feels uncomfortable or makes you light-headed.",
		},
		sources: [
			{
				label: "Study: humming and nasal nitric oxide",
				href: "https://pubmed.ncbi.nlm.nih.gov/12119224/",
			},
			{
				label: "Systematic review: Bhramari Pranayama",
				href: "https://pubmed.ncbi.nlm.nih.gov/29321984/",
			},
		],
		cardWidth: "120",
		cardHeight: "120",
		sectionId: "humming",
	},
	{
		name: "Bilateral Stimulation",
		icon: BilateralStimulationIcon,
		description: {
			p1: "Bilateral stimulation is used within eye movement desensitization and reprocessing (EMDR), a structured psychotherapy. Laboratory research suggests that eye movements performed while recalling an emotional memory can make that memory feel less vivid or emotional; the mechanism remains uncertain.",
			p2: "A standalone tapping or eye-movement exercise is not the same as EMDR and should not be used to self-treat trauma or overwhelming distress. If a memory feels upsetting, pause and use a simple grounding activity that feels safe; seek support from a qualified mental-health professional for persistent or trauma-related symptoms.",
		},
		sources: [
			{
				label: "Meta-analysis: dual-task interventions and emotional memories",
				href: "https://pubmed.ncbi.nlm.nih.gov/34619553/",
			},
			{
				label: "Systematic review: proposed EMDR mechanisms",
				href: "https://pubmed.ncbi.nlm.nih.gov/30166975/",
			},
		],
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
					While box breathing provides an accessible, real-time
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

			<section
				className="w-[88vw] max-w-[50ch] mx-auto mb-16 border-t border-outline/30 pt-8 text-center"
				aria-labelledby="next-steps"
			>
				<h2
					id="next-steps"
					className="text-lg font-medium text-title"
				>
					Next steps
				</h2>
				<p className="mt-2 text-sm text-paragraph">
					Return to the{" "}
					<Link
						href="/home"
						className="font-medium text-secondary underline decoration-secondary/50 underline-offset-4 hover:text-primary dark:text-[#c0e1e9] dark:decoration-[#c0e1e9]/60 dark:hover:text-[#bffaff]"
					>
						guided box-breathing timer
					</Link>{" "}
					or read about{" "}
					<Link
						href="/the-science"
						className="font-medium text-secondary underline decoration-secondary/50 underline-offset-4 hover:text-primary dark:text-[#c0e1e9] dark:decoration-[#c0e1e9]/60 dark:hover:text-[#bffaff]"
					>
						the science of box breathing
					</Link>{" "}
					for more context.
				</p>
			</section>
		</div>
	);
};

export default page;
