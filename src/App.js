import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/exam/Quiz";
import { QuizContextProvider } from "./providers/quizProvider";
import Layout from "./components/main/Layout";
import Sidebar from "./components/main/Sidebar";
import Dashboard from "./pages/main/Dashboard";
import Library from "./pages/main/Library";
import Annales from "./pages/main/Annlaes";
import Planner from "./pages/main/Planner";
import Playlists from "./pages/main/Playlists";
import Toolbox from "./pages/main/Toolbox";

function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <BrowserRouter>
          <Layout title="Dashboard" Sidebar={Sidebar}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/library/" element={<Library />} />
              <Route path="/annales/" element={<Annales />} />
              <Route path="/planner/" element={<Planner />} />
              <Route path="/playlists/" element={<Playlists />} />
              <Route path="/toolbox/" element={<Toolbox />} />
            </Routes>
          </Layout>
          <Routes>
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </QuizContextProvider>
    </div>
  );
}

export default App;
