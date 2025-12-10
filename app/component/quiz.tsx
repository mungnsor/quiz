"use client";

import { StarIcon } from "../icons/starIcon";

export const QuizTest = () => {
  return (
    <div className="w-[558px] h-72 flex flex-col gap-4 ">
      <div className="flex justify-between ">
        <p className="flex items-center gap-3 text-[24px] font-semibold">
          <StarIcon /> Quick test
        </p>
        <button className="h-10 w-12 flex justify-center items-center rounded-lg border border-gray-200">
          x
        </button>
      </div>
      <p className="text-[#71717a] font-medium text-base">
        Take a quick test about your knowledge from your content{" "}
      </p>
      <div className="w-[558px] h-[200px] rounded-lg border border-gray-200 flex items-center">
        <div className="flex flex-col gap-4 p-5">
          <div className="flex justify-between ">
            <p className="font-medium text-lg">
              What was Chingis Khan`s birth name?
            </p>
            <p className="text-lg">
              1 <span className=" text-gray-500">/ 5</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center ">
              Yesugao
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center ">
              Yesugao
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center ">
              Yesugao
            </button>
            <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center ">
              Yesugao
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
