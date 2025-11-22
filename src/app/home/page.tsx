import React from "react";

const page = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            <div>
                <div className='bg-[#005B70] text-white w-34 h-34 rounded-full flex items-center justify-center mb-8 m-[0_auto]'>
                    <h1 className="text-lg font-medium">Breathe In</h1>
                </div>
                <div className="flex items-center justify-center gap-x-6">
                    <button className="border-2 border-[#004E60] rounded-[2px] w-28 h-12 font-medium text-center cursor-pointer">Pause</button>
                    <button className=" bg-[#022932] text-white rounded-[2px] w-28 h-12 font-medium text-center cursor-pointer">Start</button>
                    <button className="border-2 border-[#004E60] rounded-[2px] w-28 h-12 font-medium text-center cursor-pointer">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default page;
