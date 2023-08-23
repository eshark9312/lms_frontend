import { useEffect, useState } from "react";
import ExamSidebar from "../../components/exam/ExamSidebar";
import QuestionCardSimple from "../../components/exam/QuestionCardSimple";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../providers/examProvider";

export default function ExamPage() {
  const navigator = useNavigate();
  const { dps, setDps, submitAnswers } = useExam();
  const [currentDp, setCurrentDp] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [sidebarLeft, setSidebar] = useState(false);
  const [totalTime, setTotalTime] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    const timeLimit =
      dps.reduce((total, { questions }) => (total += questions.length), 0) *
      60 *
      1000;
    setTotalTime(timeLimit);
    const endTime = Date.now() + timeLimit;
    let timer
    setTimeout(() => {
      clearInterval(timer);
      setEnd(true);
    }, timeLimit);
    timer = setInterval(() => {
      setTimeLeft(Math.max(0,endTime - Date.now()));
    }, 100);
  }, []);

  useEffect(() => {
    end && submitAnswers();
  }, [end, submitAnswers]);

  const setAnswer = (answer) => {
    console.log(answer);
    const tempDps = JSON.parse(JSON.stringify(dps));
    tempDps[currentDp].questions[currentQuestion].userAnswer = answer;
    setDps(tempDps);
  };
  const next = (answer) => {
    setAnswer(answer);
    if (currentQuestion < dps[currentDp].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentDp < dps.length - 1) {
      setCurrentDp(currentDp + 1);
      setCurrentQuestion(0);
    }
  };

  useEffect(() => {
    if (dps.length > 0) {
      setIsLastQuestion(
        currentDp === dps.length - 1 &&
          currentQuestion === dps[currentDp].questions.length - 1
      );
    } else {
      navigator(-1);
    }
  }, [dps, currentDp, currentQuestion, navigator]);

  console.log(dps);
  if (dps.length < 1 || !dps) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex-1">
        <div
          className={`${
            sidebarLeft ? "lg:left-0" : "lg:right-0"
          } lg:w-72 hidden bg-white lg:absolute lg:inset-y-0 lg:z-2 lg:flex lg:flex-col`}
        >
          <ExamSidebar
            dps={dps}
            currentDp={currentDp}
            setCurrentDp={setCurrentDp}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setEnd={setEnd}
            sidebarLeft={sidebarLeft}
            setSidebar={setSidebar}
            totalTime={totalTime}
            timeLeft={timeLeft}
          />
        </div>
        <div
          className={`${
            sidebarLeft ? "lg:pl-72" : "lg:pr-72"
          } h-screen overflow-auto`}
        >
          <QuestionCardSimple
            desc={dps[currentDp].desc}
            question={dps[currentDp].questions[currentQuestion]}
            answer={dps[currentDp].questions[currentQuestion].userAnswer}
            currentDp={currentDp}
            currentQuestion={currentQuestion}
            isLastQuestion={isLastQuestion}
            next={next}
          />
        </div>
      </div>
    </div>
  );
}
