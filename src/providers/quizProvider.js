import { createContext, useState } from "react";

const parseQuestion = (question) => {
  let parsedQuestion;
  switch (question.__t) {
    case "MultiChoice":
      parsedQuestion = {
        _id: question._id,
        level: question.difficulty ? "A" : "B",
        weight: 20,
        // src: question.src,
        src: "Référentiel de Neurologie 2018, p.289",
        // type: question.type,
        type: question.__t,
        tags: question.tags,
        statistics: {
          lastAttempt: "6 days ago",
          lastScore: 10,
          successRate: 32,
        },
        content: question.question,
        choices: question.answers.map(({ choice }) => choice),
      };
      break;
    case "ShortAnswer":
      parsedQuestion = {
        _id: question._id,
        level: question.difficulty ? "A" : "B",
        weight: 20,
        // src: question.src,
        src: "Référentiel de Neurologie 2018, p.289",
        // type: question.type,
        type: question.__t,
        tags: question.tags,
        statistics: {
          lastAttempt: "6 days ago",
          lastScore: 10,
          successRate: 32,
        },
        content: question.question,
        choices: question.answers.map(({ choice }) => choice),
      };
      break;
    case "TrueOrFalse":
      parsedQuestion = {
        _id: question._id,
        level: question.difficulty ? "A" : "B",
        weight: 20,
        // src: question.src,
        src: "Référentiel de Neurologie 2018, p.289",
        // type: question.type,
        type: question.__t,
        tags: question.tags,
        statistics: {
          lastAttempt: "6 days ago",
          lastScore: 10,
          successRate: 32,
        },
        content: question.question,
      };
      break;
    default:
      break;
  }
  return parsedQuestion;
};
export const QuizContextProvider = (props) => {

  const [questions, setQuestions] = useState();
  const [openTakeTestModal, setOpenTakeTestModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState()
  const [currentDp, setCurrentDp] = useState()
  const loadQuestions = (rawQuestions) => {
    setQuestions(rawQuestions.map(parseQuestion));
  };

  const value = {
    questions,
    setQuestions,
    loadQuestions,
    openTakeTestModal,
    setOpenTakeTestModal,
    currentQuestion,
    setCurrentQuestion,
    currentDp,
    setCurrentDp,
  };

  return (
    <QuizContext.Provider value={value}>{props.children}</QuizContext.Provider>
  );
};

export const QuizContext = createContext({});
