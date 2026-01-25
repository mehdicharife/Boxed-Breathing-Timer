import React from "react";
import Lung from "../components/vectors/Lung";
import VagusNerve from "../components/vectors/VagusNerve";
import HeartRate from "../components/vectors/HeartRate";
import BP from "../components/vectors/BP";

const page = () => {
	return (
		<div className="flex justify-center pt-8 mb-5 ">
			<div className="[&>p]:w-[85vw] min-[520px]:[&>p]:w-[50ch] [&>p]:text-sm [&>p]:text-paragraph flex flex-col items-center">
				<h1 className="text-2xl font-bold text-title text-center mb-8">
					The Science Behind Boxed Breathing
				</h1>
				<div className="flex gap-x-[10%] mb-10 w-[85vw] max-w-[620px]">
					<div className="relative w-[25%]">
						<h2 className="text-xs min-[510px]:text-sm text-title font-medium text-center mb-3.5 after:content-['Inhale'] min-[550px]:after:content-['Breathe_In']"></h2>
						<div className="w-full h-0 pb-[100%] border-2 border-outline"></div>
						<div className="block absolute w-full h-0.5 bg-arrow left-0 top-6">
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>
					<div className="relative w-[25%]">
						<h2 className="text-xs min-[510px]:text-sm text-title font-medium text-center mb-3.5 after:content-['Hold']"></h2>
						<div className="w-full h-0 pb-[100%] border-2 border-outline"></div>
						<div className="block absolute w-full h-0.5 bg-arrow left-2 bottom-0 rotate-90 origin-bottom-right">
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="relative w-[25%]">
						<h2 className="text-xs min-[510px]:text-sm text-title font-medium text-center mb-3.5 after:content-['Exhale'] min-[550px]:after:content-['Breathe_out']"></h2>
						<div className="w-full h-0 pb-[100%] border-2 border-outline"></div>
						<div className="block absolute w-full h-0.5 bg-arrow left-0 -bottom-2.5 -rotate-180">
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="relative w-[25%]">
						<h2 className="text-xs min-[510px]:text-sm text-title font-medium text-center mb-3.5 after:content-['Hold']"></h2>
						<div className="w-full h-0 pb-[100%] border-2 border-outline"></div>
						<div className="block absolute w-full h-0.5 bg-arrow -left-2.5 -bottom-0.5 -rotate-90 origin-top-left">
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>
				</div>
				<p className="text-sm text-justify mb-5">
					Boxed breathing, also called square breathing, is a
					simple relaxation technique that involves breathing in
					a rhythmic pattern to reduce stress and improve focus.
					The method gets its name from visualizing a box: you
					breathe in for four counts, hold your breath for four
					counts, exhale for four counts, and hold empty for four
					counts, then repeat. This equal timing creates a
					&ldquo;box&rdquo; shape when you imagine each side
					representing one step. It&apos;s commonly used by
					athletes, military personnel, and anyone dealing with
					anxiety or stress because it activates the
					parasympathetic nervous system, helping to calm the
					body and mind. The technique is easy to do anywhere and
					requires no special equipment—just your breath and a
					few moments of attention
				</p>

				<p className="text-sm text-justify mb-6">
					Boxed breathing, also called square breathing, is a
					simple relaxation technique that involves breathing in
					a rhythmic pattern to reduce stress and improve focus.
					The method gets its name from visualizing a box: you
					breathe in for four counts, hold your breath for four
					counts, exhale for four counts, and hold empty for four
					counts, then repeat. This equal timing creates a
					&ldquo;box&quot; shape when you imagine each side
					representing one step. It&apos;s commonly used by
					athletes, military personnel, and anyone dealing with
					anxiety or stress because it activates the
					parasympathetic nervous system, helping to calm the
					body and mind. The technique is easy to do anywhere and
					requires no special equipment—just your breath and a
					few moments of attention
				</p>

				<div className="hidden min-[700px]:flex gap-x-12 mb-12 ">
					<div className="flex items-center gap-x-3">
						<div className="flex flex-col items-center">
							<Lung
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs text-title font-medium">
								Slower breathing rate
							</p>
						</div>
						<div className="w-16 h-0.5 bg-outline relative">
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 -rotate-30  origin-top-right "></span>
						</div>
						<div className="flex flex-col items-center">
							<VagusNerve
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs text-title font-medium">
								Vagus Nerve Activation
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-y-6">
						<div className="w-16 h-0.5 bg-outline relative -rotate-30 origin-bottom-left">
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 -rotate-30  origin-top-right "></span>
						</div>{" "}
						<div className="w-16 h-0.5 bg-outline relative rotate-30 origin-bottom-left">
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-outline right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="flex flex-col gap-y-8">
						<div className="flex flex-col items-center">
							<HeartRate
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs text-title font-medium">
								Slower Heart Rate
							</p>
						</div>{" "}
						<div className="flex flex-col items-center">
							<BP
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs text-title font-medium">
								Lower Blood Pressure
							</p>
						</div>
					</div>
				</div>
				<p className="text-justify mb-6">
					While the science behind box breathing reveals complex
					physiological mechanisms, the beauty of this technique
					lies in its simplicity and accessibility. Whether
					you&apos;sre preparing for a high-pressure
					presentation, recovering from a stressful encounter, or
					simply taking a midday break to reset your nervous
					system, box breathing offers a science-backed tool
					that&apos;s always available to you.
				</p>

				<p className="text-justify mb-6">
					With consistent practice, many people find that box
					breathing becomes an automatic response to stress—a
					portable anchor they can rely on to restore calm and
					clarity whenever life demands it. In a world full of
					complexity, sometimes the most powerful solutions are
					the ones we carry within us, one measured breath at a
					time.
				</p>

				<div className="flex justify-end min-[70ch]:w-[50ch] w-[90vw] mb-4 group">
					<a href="/home" className="flex items-center gap-x-5">
						<div className="w-12 h-0.5 bg-arrow relative rotate-180 group-hover:w-20  transition-[width] delay-150 duration-300 ease-in-out">
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-arrow right-0 -rotate-30  origin-top-right "></span>
						</div>
						<div className="text-sm text-title italic font-medium group-hover:not-italic">
							Go to the exercise page
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default page;
