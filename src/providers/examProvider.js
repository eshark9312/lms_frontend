import { createContext, useContext, useState } from "react";
import useAuthHttpClient from "../hooks/useAuthHttpClient";
import { useAuth } from "./authProvider";
import { useNavigate } from "react-router-dom";

export const ExamContextProvider = (props) => {
  const navigator = useNavigate()
  const authHttpClient = useAuthHttpClient();
  const { user } = useAuth();
  const [selectedDps, setSelectedDps] = useState([]);   // only [_id]
  const [dps, setDps] = useState([]);
  const [result, setResult] = useState([]);
  const [openTakeExamModal, setOpenTakeExamModal] = useState(false);

  const submitAnswers = async () => {
    const resuldDps = []
    for(let i = 0; i < dps.length; i++){
      const answers = dps[i].questions.map(({ userAnswer }) => userAnswer);
      console.log(answers)
      const response = await authHttpClient.post("/answer/dp/", {
        user_id: user._id,
        dp_id: dps[i]._id,
        answers,
      });
      resuldDps.push(response.data.data);
    }
    setDps([]);
    setResult(resuldDps);
    navigator("/result/")
  };
  const value = {
    dps,
    setDps,
    selectedDps,
    setSelectedDps,
    openTakeExamModal,
    setOpenTakeExamModal,
    submitAnswers,
    result
  };

  return (
    <ExamContext.Provider value={value}>{props.children}</ExamContext.Provider>
  );
};

export const ExamContext = createContext({});

export function useExam() {
  return useContext(ExamContext);
}
