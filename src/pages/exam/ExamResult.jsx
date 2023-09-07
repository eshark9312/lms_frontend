import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../providers/examProvider";
import ExamResultSidebar from "../../components/exam/ExamResultSidebar";
import QuestionResultCard from "../../components/exam/QuestionResultCard";

export default function ExamResultPage() {
  const navigator = useNavigate();
  const { result } = useExam();
  const [dpOrQuestion, setDpOrQuestion] = useState(
    result.dps.length ? "dp" : "question"
  ); // "dp" or "question"
  const [currentDp, setCurrentDp] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const next = () => {
    if (dpOrQuestion === "dp") {
      if (currentQuestion < result.dps[currentDp].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentDp < result.dps.length - 1) {
        setCurrentDp(currentDp + 1);
        setCurrentQuestion(0);
      }
    } else if (currentQuestion < result.questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    if (result.dps.length < 1 && result.questions.length < 1) {
      navigator(-1);
    }
    result.dps.length < 1 && setDpOrQuestion("question");
  }, [result, navigator]);

  if (result.dps.length < 1 && result.questions.length < 1) return null;

  return (
    <>
      <div>
        <div className="hidden bg-[#53389E] lg:absolute lg:right-0 lg:inset-y-0 lg:z-2 lg:flex lg:w-72 lg:flex-col">
          <ExamResultSidebar
            result={result}
            dpOrQuestion={dpOrQuestion}
            setDpOrQuestion={setDpOrQuestion}
            currentDp={currentDp}
            setCurrentDp={setCurrentDp}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
        <div className="lg:pr-72 h-screen overflow-auto">
          <QuestionResultCard
            dpOrQuestion={dpOrQuestion}
            desc={dpOrQuestion === "dp" ? result.dps[currentDp]?.desc : ""}
            question={
              dpOrQuestion === "dp"
                ? result.dps[currentDp].questions[currentQuestion]
                : result.questions[currentQuestion]
            }
            currentDp={currentDp}
            currentQuestion={currentQuestion}
            next={next}
          />
        </div>
      </div>
    </>
  );
}
