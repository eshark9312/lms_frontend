import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./providers/authProvider";
import { QuizContextProvider } from "./providers/quizProvider";
import { ExamContextProvider } from "./providers/examProvider";
import { CardProvider } from "./providers/cardProvider";
import { NotificationProvider } from "./providers/notificationProvider";
import { useAuth } from "./providers/authProvider";

import Layout from "./components/main/Layout";
import Sidebar from "./components/main/Sidebar";
import Dashboard from "./pages/main/Dashboard";
import Planner from "./pages/main/Planner";
import PlaylistsPage from "./pages/main/PlaylistPage";
import Toolbox from "./pages/main/Toolbox";
import Matiere from "./components/main/library/matiere/Matiere";
import Item from "./components/main/library/item/Item";
import LibraryPage from "./pages/main/LibraryPage";
import AnnalesPage from "./pages/main/AnnlaesPage";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Users from "./pages/main/Users";
import TakeTestModal from "./components/exam/TakeTestModal";
import CardSlider from "./components/common/CardSlider";
import Notification from "./components/common/Notification";
import AddNewQuestionPage from "./pages/main/AddQuestion";
import AddNewDPPage from "./pages/main/AddDP";
import ExamPage from "./pages/exam/Exam";
import TestPage from "./pages/exam/Test";
import ExamResultPage from "./pages/exam/ExamResult";
import EditQuestionPage from "./pages/main/EditQuestion";
import EditDPPage from "./pages/main/EditDP";

import Colors from "./components/common/Colors";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/auth/signin" replace={true} />;
};

function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <BrowserRouter>
          <AuthProvider>
            <ExamContextProvider>
              <CardProvider>
                <NotificationProvider>
                  <Routes>
                    <Route element={<ProtectedRoute />}>
                      <Route
                        path="/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Dashboard />
                          </Layout>
                        }
                      />
                      <Route
                        path="/library/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <LibraryPage />
                          </Layout>
                        }
                      />
                      <Route
                        path="/library/matiere/:id?"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Matiere />
                          </Layout>
                        }
                      />
                      <Route
                        path="/library/item/:id?"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Item />
                          </Layout>
                        }
                      />
                      <Route
                        path="/annales/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <AnnalesPage />
                          </Layout>
                        }
                      />
                      <Route
                        path="/planner/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Planner />
                          </Layout>
                        }
                      />
                      <Route
                        path="/playlists/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <PlaylistsPage />
                          </Layout>
                        }
                      />
                      <Route
                        path="/toolbox/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Toolbox />
                          </Layout>
                        }
                      />
                      <Route
                        path="/users/"
                        element={
                          <Layout Sidebar={Sidebar}>
                            <Users />
                          </Layout>
                        }
                      />
                      <Route path="/quiz/" element={<TestPage />} />
                      <Route path="/exam/" element={<ExamPage />} />
                      <Route path="/result/" element={<ExamResultPage />} />
                      <Route
                        path="/addQuestion/"
                        element={<AddNewQuestionPage />}
                      />
                      <Route
                        path="/editQuestion/:id?"
                        element={<EditQuestionPage />}
                      />
                      <Route path="/addDP/" element={<AddNewDPPage />} />
                      <Route path="/editDP/:id?" element={<EditDPPage />} />
                      <Route path="/colors/" element={<Colors />} />
                    </Route>
                    <Route path="/auth/signin" element={<Signin />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                  <TakeTestModal />
                  <CardSlider />
                  <Notification />
                </NotificationProvider>
              </CardProvider>
            </ExamContextProvider>
          </AuthProvider>
        </BrowserRouter>
      </QuizContextProvider>
    </div>
  );
}

export default App;
