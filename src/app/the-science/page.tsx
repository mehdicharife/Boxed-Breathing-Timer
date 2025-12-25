import React from "react";
import Lung from "../components/vectors/vectors/Lung";
import VagusNerve from "../components/vectors/vectors/VagusNerve";
import HeartRate from "../components/vectors/vectors/HeartRate";
import BP from "../components/vectors/vectors/BP";

const page = () => {
	return (
		<div className="flex justify-center pt-8 mb-5 ">
			<div className="[&>p]:w-[50ch] [&>p]:text-sm [&>p]:text-justify flex flex-col items-center">
				<h1 className="text-2xl font-bold text-center mb-8">
					The Science Behind Boxed Breathing
				</h1>
				<div className="flex gap-x-18 mb-10">
					<div className="relative">
						<h2 className="text-sm font-medium text-center mb-3.5">
							Breathe In
						</h2>
						<div className="w-26 h-26 border-2 border-[#005B70]"></div>
						<div className="block absolute w-full h-0.5 bg-[#00AED5] left-0 top-6">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>
					<div className="relative">
						<h2 className="text-sm font-medium text-center mb-3.5">
							Hold
						</h2>
						<div className="w-26 h-26 border-2 border-[#005B70]"></div>
						<div className="block absolute w-full h-0.5 bg-[#00AED5] left-2 bottom-0 rotate-90 origin-bottom-right">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="relative">
						<h2 className="text-sm font-medium text-center mb-3.5">
							Breathe Out
						</h2>
						<div className="w-26 h-26 border-2 border-[#005B70]"></div>
						<div className="block absolute w-full h-0.5 bg-[#00AED5] left-0 -bottom-2.5 -rotate-180">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="relative">
						<h2 className="text-sm font-medium text-center mb-3.5">
							Hold
						</h2>
						<div className="w-26 h-26 border-2 border-[#005B70]"></div>
						<div className="block absolute w-full h-0.5 bg-[#00AED5] -left-2.5 -bottom-0.5 -rotate-90 origin-top-left">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
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
					counts, then repeat. This equal timing creates a &ldquo;box&rdquo;
					shape when you imagine each side representing one step.
					It&apos;s commonly used by athletes, military personnel, and
					anyone dealing with anxiety or stress because it
					activates the parasympathetic nervous system, helping
					to calm the body and mind. The technique is easy to do
					anywhere and requires no special equipment—just your
					breath and a few moments of attention
				</p>

				<p className="text-sm text-justify mb-6">
					Boxed breathing, also called square breathing, is a
					simple relaxation technique that involves breathing in
					a rhythmic pattern to reduce stress and improve focus.
					The method gets its name from visualizing a box: you
					breathe in for four counts, hold your breath for four
					counts, exhale for four counts, and hold empty for four
					counts, then repeat. This equal timing creates a &ldquo;box&quot;
					shape when you imagine each side representing one step.
					It&apos;s commonly used by athletes, military personnel, and
					anyone dealing with anxiety or stress because it
					activates the parasympathetic nervous system, helping
					to calm the body and mind. The technique is easy to do
					anywhere and requires no special equipment—just your
					breath and a few moments of attention
				</p>

				<div className="flex gap-x-12 mb-12">
					<div className="flex items-center gap-x-3">
						<div className="flex flex-col items-center">
							<Lung
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs font-medium">
								Slower breathing rate
							</p>
						</div>
						<div className="w-16 h-0.5 bg-[#00AED5] relative">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
						<div className="flex flex-col items-center">
							<VagusNerve
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs font-medium">
								Vagus Nerve Activation
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-y-6">
						<div className="w-16 h-0.5 bg-[#00AED5] relative -rotate-30 origin-bottom-left">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>{" "}
						<div className="w-16 h-0.5 bg-[#00AED5] relative rotate-30 origin-bottom-left">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
					</div>

					<div className="flex flex-col gap-y-8">
						<div className="flex flex-col items-center">
							<HeartRate
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs font-medium">
								Slower Heart Rate
							</p>
						</div>{" "}
						<div className="flex flex-col items-center">
							<BP
								width="40"
								height="40"
								className="mb-2"
							/>
							<p className="text-xs font-medium">
								Lower Blood Pressure
							</p>
						</div>
					</div>
				</div>
				<p className="mb-6">
					While the science behind box breathing reveals complex
					physiological mechanisms, the beauty of this technique
					lies in its simplicity and accessibility. Whether
					you&apo;sre preparing for a high-pressure presentation,
					recovering from a stressful encounter, or simply taking
					a midday break to reset your nervous system, box
					breathing offers a science-backed tool that&pos;s always
					available to you.
				</p>

				<p className="mb-6">
					With consistent practice, many people find that box
					breathing becomes an automatic response to stress—a
					portable anchor they can rely on to restore calm and
					clarity whenever life demands it. In a world full of
					complexity, sometimes the most powerful solutions are
					the ones we carry within us, one measured breath at a
					time.
				</p>

				<div className="flex justify-end w-[50ch] mb-4">
					<a href="/home" className="flex items-center gap-x-5">
						<div className="w-12 h-0.5 bg-[#00AED5] relative rotate-180">
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 rotate-30 origin-bottom-right "></span>
							<span className="absolute w-2.5 h-0.5 bg-[#00AED5] right-0 -rotate-30  origin-top-right "></span>
						</div>
						<p className="text-sm italic font-medium">Go to the exercise page</p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default page;
