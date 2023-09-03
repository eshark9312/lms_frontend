import { useEffect, useState } from "react";
import ExamSidebar from "../../components/exam/ExamSidebar";
import QuestionCardSimple from "../../components/exam/QuestionCardSimple";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../providers/examProvider";
import DpCardSimple from "../../components/exam/DpCardSimple";
import Modal from "../../components/common/Modal";

export default function ExamPage() {
  console.log("examPage");
  const navigator = useNavigate();
  const { questions, setQuestions, dps, setDps, submitAnswers, isSubmitting } = useExam();
  const [dpOrQuestion, setDpOrQuestion] = useState("dp"); // "dp" or "question"
  const [currentDp, setCurrentDp] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sidebarLeft, setSidebar] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    end && submitAnswers();
  }, [end, submitAnswers]);

  const setAnswer = (answer) => {
    console.log(answer);
    const tempQuestions = JSON.parse(JSON.stringify(questions));
    tempQuestions[currentQuestion].userAnswer = answer;
    setQuestions(tempQuestions);
  };
  const next = (answer) => {
    setAnswer(answer);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    if (dps.length > 0 || questions.length > 0) {
      if (dps.length === 0) setDpOrQuestion("question");
    } else {
      navigator(-1);
    }
  }, [questions, dps, currentDp, currentQuestion, navigator]);

  if ((questions.length < 1 && dps.length < 1) || (!dps && !questions))
    return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex-1">
        <div
          className={`${
            sidebarLeft ? "lg:left-0" : "lg:right-0"
          } lg:w-72 hidden bg-white lg:absolute lg:inset-y-0 lg:z-2 lg:flex lg:flex-col`}
        >
          <ExamSidebar
            isSubmitting={isSubmitting}
            dps={dps}
            questions={questions}
            dpOrQuestion={dpOrQuestion}
            setDpOrQuestion={setDpOrQuestion}
            currentDp={currentDp}
            setCurrentDp={setCurrentDp}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setEnd={setEnd}
            sidebarLeft={sidebarLeft}
            setSidebar={setSidebar}
          />
        </div>
        <div
          className={`${
            sidebarLeft ? "lg:pl-72" : "lg:pr-72"
          } h-screen overflow-auto`}
        >
          {dpOrQuestion === "dp" && dps?.length && (
            <DpCardSimple
              dps={dps}
              setDps={setDps}
              currentDp={currentDp}
              setCurrentDp={setCurrentDp}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          )}
          {dpOrQuestion === "question" && questions?.length&& (
            <QuestionCardSimple
              question={questions[currentQuestion]}
              answer={questions[currentQuestion]?.userAnswer}
              currentQuestion={currentQuestion}
              next={next}
            />
          )}
        </div>
      </div>
    </div>
  );
}

