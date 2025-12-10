"use client ";

import { RefreshIcon } from "../icons/refreshIcon";
import { RightIcon } from "../icons/rightIcon";
import { SaveIcon } from "../icons/saveIcon";
import { StarIcon } from "../icons/starIcon";
import { WrongIcon } from "../icons/wrongIcon";

export const CheckScore = () => {
  return (
    <div className="w-[428px] h-[616px] flex flex-col gap-4">
      <p className="flex gap-3 items-center font-bold text-2xl ">
        <StarIcon /> Quiz completed
      </p>
      <p className="text-[#71717a] text-base font-medium">
        Lets see what you did
      </p>
      <div className=" border-gray-200 border rounded-lg flex flex-col gap-3 w-[428px] h-[568px] p-5">
        <p className="font-bold text-2xl">
          Your score : 2 <span>/ 5</span>
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center ">
            <WrongIcon />
            <div className="text-[#71717a]">
              1. What was Chingis Khan`s birth name?
              <p className="text-black">Your answer: Toghtul</p>
              <p className="text-green-500">Correct : Temujin</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center ">
            <RightIcon />
            <div>
              1. What was Chingis Khan`s birth name?
              <p>Your answer: Toghtul</p>
              <p className="text-green-500">Correct : Temujin</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center ">
            <RightIcon />
            <div>
              1. What was Chingis Khan`s birth name?
              <p>Your answer: Toghtul</p>
              <p>Correct : Temujin</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center ">
            <RightIcon />
            <div>
              1. What was Chingis Khan`s birth name?
              <p>Your answer: Toghtul</p>
              <p>Correct : Temujin</p>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center ">
            <RightIcon />
            <div>
              1. What was Chingis Khan`s birth name?
              <p>Your answer: Toghtul</p>
              <p>Correct : Temujin</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <button className="w-44 h-10 border border-gray-200 flex justify-center items-center rounded-lg gap-2">
            <RefreshIcon /> Restart quiz
          </button>
          <button className="w-44 h-10 bg-black  flex justify-center items-center text-white rounded-lg gap-2">
            <SaveIcon /> Save and leave
          </button>
        </div>
      </div>
    </div>
  );
};
