import React from "react";
import ExitIcon from "../icons/ExitIcon";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ExamResultSidebar({
  dps,
  currentDp,
  setCurrentDp,
  currentQuestion,
  setCurrentQuestion,
  closeSideBar,
}) {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="text-center text-white p-8 pb-4 font-bold text-lg">
        Exam Result
      </div>
      <div className="flex-1 overflow-auto">
        {dps.map((dp, dp_index) => (
          <div className="w-full">
            <div className="px-6 w-full text-white font-bold py-2 text-left">{`DP ${
              dp_index + 1
            }`}</div>
            <div className="px-8 py-2 flex-1 overflow-auto flex flex-col gap-1">
              {dp.questions.map((question, qi_index) => (
                <div
                  onClick={() => {
                    setCurrentDp(dp_index);
                    setCurrentQuestion(qi_index);
                  }}
                  className={classNames(
                    "text-primary-100 rounded-md py-1 hover:bg-primary-700 active:bg-primary-600 focus:bg-primary-600 click-action hover:cursor-pointer",
                    dp_index === currentDp &&
                      qi_index === currentQuestion &&
                      "bg-primary-700"
                  )}
                >
                  <i
                    className={`ri-checkbox-blank-circle-fill px-2 ${
                      !question.userAnswer
                        ? "text-white"
                        : question.user_score > 15
                        ? "text-green-light"
                        : question.user_score > 3
                        ? "text-orange-light"
                        : "text-red-light"
                    }`}
                  ></i>
                  {`Question ${qi_index + 1}`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-white p-8 flex">
        <div className="flex-1">TERMINER</div>
        <button onClick={() => navigator("/")}>
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}

export default ExamResultSidebar;
