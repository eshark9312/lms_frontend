import { createContext, useContext, useState } from "react";
import useAuthHttpClient from "../hooks/useAuthHttpClient";
import { useAuth } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const ExamContextProvider = (props) => {
  const navigator = useNavigate();
  const authHttpClient = useAuthHttpClient();
  const { user } = useAuth();
  const [selectedDps, setSelectedDps] = useState([]); // only [_id]
  const [selectedQuestions, setSelectedQuestions] = useState([]); // only [_id]
  const [dps, setDps] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState({ dps: [], questions: [] });
  const [openTakeExamModal, setOpenTakeExamModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAnswers = async () => {
    setIsSubmitting(true);
    const resultDps = [];
    const resultQis = [];
    for (let i = 0; i < dps.length; i++) {
      const answers = dps[i].questions.map(({ userAnswer }) => userAnswer);
      console.log(answers);
      const response = await authHttpClient.post("/answer/dp/", {
        user_id: user._id,
        dp_id: dps[i]._id,
        answers,
      });
      resultDps.push(response.data.data);
    }
    for (let i = 0; i < questions.length; i++) {
      const answer = questions[i].userAnswer;
      const response = await authHttpClient.post("/answer", {
        user_id: user._id,
        question: {
          question_id: questions[i]._id,
          type: questions[i].__t,
        },
        answer,
      });
      resultQis.push({
        ...response.data.data.question,
        user_score: response.data.data.score,
        userAnswer: answer,
        total_score: 20,
      });
    }
    setDps([]);
    setQuestions([]);
    setResult({ dps: resultDps, questions: resultQis });
    setIsSubmitting(false);
    navigator("/result/");
  };
  const value = {
    isSubmitting,
    questions,
    setQuestions,
    selectedQuestions,
    setSelectedQuestions,
    dps,
    setDps,
    selectedDps,
    setSelectedDps,
    openTakeExamModal,
    setOpenTakeExamModal,
    submitAnswers,
    result,
  };

  return (
    <ExamContext.Provider value={value}>{props.children}</ExamContext.Provider>
  );
};

export const ExamContext = createContext({});

export function useExam() {
  return useContext(ExamContext);
}
