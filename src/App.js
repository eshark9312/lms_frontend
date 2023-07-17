import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import { QuizContextProvider } from "./providers/quizProvider";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </QuizContextProvider>
    </div>
  );
}

export default App;
