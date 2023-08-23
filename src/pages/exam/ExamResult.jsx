import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../providers/examProvider";
import ExamResultSidebar from "../../components/exam/ExamResultSidebar";
import QuestionResultCard from "../../components/exam/QuestionResultCard";

export default function ExamResultPage() {
  const navigator = useNavigate();
  const { result } = useExam();
  const [currentDp, setCurrentDp] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const next = () => {
    if (currentQuestion < result[currentDp].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentDp < result.length - 1) {
      setCurrentDp(currentDp + 1);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    if (result.length < 1) {
      navigator(-1);
    }
  }, [result, navigator]);

  if (result.length < 1 || !result) return null;

  return (
    <>
      <div>
        <div className="hidden bg-[#53389E] lg:absolute lg:right-0 lg:inset-y-0 lg:z-2 lg:flex lg:w-72 lg:flex-col">
          <ExamResultSidebar
            dps={result}
            currentDp={currentDp}
            setCurrentDp={setCurrentDp}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
        <div className="lg:pr-72 h-screen overflow-auto">
          <QuestionResultCard
            desc={result[currentDp].desc}
            question={result[currentDp].questions[currentQuestion]}
            currentDp={currentDp}
            currentQuestion={currentQuestion}
            next={next}
          />
        </div>
      </div>
    </>
  );
}
