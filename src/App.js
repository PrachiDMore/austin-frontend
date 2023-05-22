import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AdmissionPage from "./pages/AdmissionPage";
import ViewAdmissions from "./pages/ViewAdmissions";
import ViewTeachers from "./pages/ViewTeachers";
import Subjects from "./pages/Subjects";
import { TeacherContextProvider } from "./context/Teachers";
import { SubjectContextProvider } from "./context/Subjects";
import {ChapterContextProvider} from "./context/Chapter";
import Chapters from "./pages/Chapters";

function App() {
  return (
    <>
      <TeacherContextProvider>
        <SubjectContextProvider>
          <ChapterContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/admission" element={<AdmissionPage />} />
                <Route path="/admin/admissions" element={<ViewAdmissions />} />
                <Route
                  path="/admin/admissions/:_id"
                  element={<AdmissionPage />}
                />
                <Route path="/admin/teachers" element={<ViewTeachers />} />
                <Route path="/admin/subjects" element={<Subjects />} />
                <Route path="/admin/chapters" element={<Chapters />} />

              </Routes>
            </Router>
          </ChapterContextProvider>
        </SubjectContextProvider>
      </TeacherContextProvider>
    </>
  );
}

export default App;
