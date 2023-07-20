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
import Matiere from "./components/main/library/Matiere";

function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout Sidebar={Sidebar}><Dashboard /></Layout>} />
              <Route path="/library/" element={<Layout Sidebar={Sidebar}><Library /></Layout>} />
              <Route path="/library/matiere/:id?" element={<Layout Sidebar={Sidebar}><Matiere /></Layout>} />
              <Route path="/annales/" element={<Layout Sidebar={Sidebar}><Annales /></Layout>} />
              <Route path="/planner/" element={<Layout Sidebar={Sidebar}><Planner /></Layout>} />
              <Route path="/playlists/" element={<Layout Sidebar={Sidebar}><Playlists /></Layout>} />
              <Route path="/toolbox/" element={<Layout Sidebar={Sidebar}><Toolbox /></Layout>} />
              <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </QuizContextProvider>
    </div>
  );
}

export default App;
