import React from "react";
import SighIcon from "../components/vectors/vectors/Sigh";
import BinauralBeatsIcon from "../components/vectors/vectors/BinauralBeatsIcon";
import ColdExposureIcon from "../components/vectors/vectors/ColdExposureIcon";
import HummingIcon from "../components/vectors/vectors/HummingIcon";
import BilateralStimulationIcon from "../components/vectors/vectors/BilateralStimulationIcon";

const page = () => {
	return (
		<div className="pt-8 [&_svg]:dark:filter-[brightness(0)_saturate(100%)_invert(67%)_sepia(23%)_saturate(475%)_hue-rotate(135deg)_brightness(100%)_contrast(94%)]	">
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

			<div className="w-full flex flex-wrap gap-x-10 gap-y-10  justify-center m-auto mb-24 [&>p]:text-[#003743] [&>a]:shrink-0 [&_a]:hover:dark:bg-[#234c5e] [&_a]:hover:dark:border-none">
				<a
					className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer group"
					href="#physiological-sigh"
				>
					<p className="text-sm text-title font-bold dark:font-medium text-center mb-2">
						The Physiological Sigh
					</p>
					<SighIcon width="120" height="120" />
				</a>
				<a
					className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer hover:border-none group"
					href="#cold-exposure"
				>
					<p className="text-sm text-title font-bold dark:font-medium text-center mb-2 ">
						Cold Exposure
					</p>
					<ColdExposureIcon width="90" height="110" />
				</a>
				<a
					className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer group"
					href="#binaural-beats"
				>
					<p className="text-sm text-title font-bold dark:font-medium text-center mb-2">
						Binaural Beats
					</p>
					<BinauralBeatsIcon width="120" height="120" />
				</a>
				<a
					className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer group"
					href="#humming"
				>
					<p className="text-sm text-title font-bold dark:font-medium text-center mb-2">
						Humming
					</p>
					<HummingIcon width="120" height="120" />
				</a>
				<a
					className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer group"
					href="#bilateral-stimulation"
				>
					<p className="text-sm text-title font-bold dark:font-medium text-center mb-2">
						Bilateral Stimulation
					</p>
					<BilateralStimulationIcon width="120" height="120" />
				</a>
			</div>

			<section
				className="flex flex-col md:flex-row items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto]"
				id="physiological-sigh"
			>
				<div className="shrink-0 w-[280px] md:w-[33%]">
					<SighIcon
						width="full"
						height="full"
						className="shrink-0"
					/>
				</div>

				<div className="max-w-[45ch] [&>p]:text-sm">
					<h1 className="text-2xl text-title font-bold mb-5">
						The Physiological Sigh
					</h1>
					<p className="mb-4">
						The physiological sigh is a natural breathing
						pattern—two quick inhales followed by a long
						exhale—that reinflates air sacs in your lungs.
						Your body does this automatically throughout the
						day to maintain optimal oxygen exchange.
					</p>
					<p>
						You can use this pattern intentionally to reduce
						stress fast. Take two inhales through your nose,
						then exhale slowly through your mouth. This
						activates your relaxation response and restores
						calm within seconds.
					</p>
				</div>
			</section>

			<section
				className="flex flex-col items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto] md:flex-row-reverse "
				id="cold-exposure"
			>
				<div className="shrink-0 w-[280px] md:w-[33%]">
					<ColdExposureIcon width="full" height="full" />
				</div>

				<div className="max-w-[45ch] [&>p]:text-sm">
					<h1 className="text-2xl font-bold mb-5">
						Cold Exposure
					</h1>
					<p className="mb-4">
						Cold exposure is a powerful tool for interrupting
						stress responses in real time. When combined with
						breath holding, cold water on your face activates
						the diving reflex—an ancient mammalian response
						that immediately slows your heart rate and shifts
						your nervous system toward calm.
					</p>
					<p>
						Fill a bowl with ice-cold water, take a breath,
						and submerge your face for 15-30 seconds while
						holding your breath. The cold water triggers an
						automatic drop in heart rate and blood pressure,
						breaking the cycle of panic or acute stress. This
						technique provides one of the fastest
						physiological ways to regain control when
						overwhelmed.
					</p>
				</div>
			</section>

			<section
				className="flex flex-col items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto] md:flex-row"
				id="binaural-beats"
			>
				<div className="shrink-0 w-[280px] md:w-[33%]">
					<BinauralBeatsIcon width="full" height="full" />
				</div>
				<div className="max-w-[45ch] [&>p]:text-sm">
					<h1 className="text-2xl font-bold mb-5">
						Binaural Beats
					</h1>
					<p className="mb-4">
						Binaural beats are an auditory phenomenon that
						occurs when you hear two slightly different
						frequencies in each ear through headphones. Your
						brain perceives a third rhythmic beat at the
						difference between these frequencies, which can
						influence your brainwave patterns and mental
						state.
					</p>
					<p>
						Listen to binaural beats in the alpha range (8-14
						Hz) or theta range (4-8 Hz) through headphones for
						10-15 minutes to promote relaxation. The rhythmic
						pulse encourages your brainwaves to synchronize
						with calming frequencies, reducing stress and
						anxiety. This passive technique works well during
						meditation, rest, or any time you need to quiet a
						busy mind.
					</p>
				</div>
			</section>
			<section
				className="flex flex-col md:flex-row items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto]"
				id="humming"
			>
				<div className="shrink-0 w-[280px] md:w-[33%]">
					<HummingIcon width="full" height="full" />
				</div>

				<div className="max-w-[45ch] [&>p]:text-sm">
					<h1 className="text-2xl font-bold mb-5">Humming</h1>
					<p className="mb-4">
						Humming is a simple vocal practice that creates
						vibrations throughout your head, chest, and body.
						These vibrations, combined with the extended
						exhale required for humming, activate your vagus
						nerve and trigger your body&pos;s natural
						relaxation response.
					</p>
					<p>
						Take a breath in through your nose, then hum on
						the exhale for as long as comfortable, keeping
						your lips closed and jaw relaxed. The vibrations
						and slow breathing pattern signal safety to your
						nervous system, lowering heart rate and reducing
						stress. Practice for just a few minutes to feel
						more grounded and centered during moments of
						tension.
					</p>
				</div>
			</section>

			<section
				className="flex flex-col md:flex-row-reverse items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto]"
				id="bilateral-stimulation"
			>
				<div className="shrink-0 w-[280px] md:w-[33%]">
					<BilateralStimulationIcon width="full" height="full" />
				</div>
				<div className="max-w-[45ch] [&>p]:text-sm">
					<h1 className="text-2xl font-bold mb-5">
						Bilateral Stimulation
					</h1>
					<p className="mb-4">
						Bilateral stimulation involves alternating sensory
						input between the left and right sides of your
						body, such as through tapping, eye movements, or
						sound. This rhythmic, side-to-side pattern engages
						both brain hemispheres and helps process emotions
						while calming the nervous system.
					</p>
					<p>
						Gently tap your knees or shoulders in an
						alternating left-right pattern, or move your eyes
						slowly side to side while focusing on a stressful
						thought or feeling. The bilateral rhythm helps
						your brain reprocess distressing emotions and
						reduces their intensity. Practice for 1-2 minutes
						whenever you feel overwhelmed or need to work
						through difficult feelings.
					</p>
				</div>
			</section>
		</div>
	);
};

export default page;
