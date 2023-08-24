import React from "react";
import ExitIcon from "../icons/ExitIcon";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function ExamSidebar({
  dps,
  currentDp,
  setCurrentDp,
  currentQuestion,
  setCurrentQuestion,
  setEnd,
  sidebarLeft,
  setSidebar,
  totalTime,
  timeLeft,
}) {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col h-full border-2 border-[#203772]">
      <div className="bg-white text-center font-extrabold p-8 pb-4">
        <div className="relative h-6 rounded-full bg-white border-[#203772] border-2 text-[#203772] overflow-hidden">
          <div
            style={{
              width: `${100 - Math.round((timeLeft * 100) / totalTime)}%`,
            }}
            className={classNames("absolute h-full rounded-full bg-[#D4E7FB]", timeLeft<10000 && "bg-red-100")}
          ></div>
          <div className="absolute w-full text-center">{`Durée ${format(timeLeft, "mm:ss")}`}</div>
        </div>
        <div className="mt-2">
          <Switch
            checked={sidebarLeft}
            onChange={() => setSidebar((_) => !_)}
            className="bg-[#203772] relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#203772] focus:ring-offset-2"
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                sidebarLeft ? "translate-x-0" : "translate-x-5",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {dps.map((dp, dp_index) => (
          <div key={dp_index} className="w-full">
            <div className="w-full bg-[#203772] text-white font-bold py-4 text-center">{`DP ${
              dp_index + 1
            }`}</div>
            <div className="px-8 py-4 grid grid-cols-4 gap-4">
              {dp.questions.map((question, qi_index) => (
                <div
                  key={question._id}
                  onClick={() => {
                    if (question.userAnswer) {
                      setCurrentDp(dp_index);
                      setCurrentQuestion(qi_index);
                    }
                  }}
                  className={classNames(
                    "w-12 h-12 flex justify-center items-center click-action hover:cursor-pointer",
                    question.userAnswer ? "bg-[#203772] text-white font-bold" : "bg-gray-200",
                    dp_index === currentDp &&
                      qi_index === currentQuestion &&
                      "border-2 border-[#203772]"
                  )}
                >
                  {qi_index + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#203772] text-center text-white p-8 flex">
        <div
          onClick={() => {
            setEnd(true);
          }}
          className="hover:cursor-pointer click-action flex-1"
        >
          TERMINER
        </div>
        <button onClick={() => navigator(-1)}>
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}

export default ExamSidebar;
