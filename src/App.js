import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AdmissionPage from "./pages/AdmissionPage";
import ViewAdmissions from "./pages/ViewAdmissions";
import ViewTeachers from "./pages/ViewTeachers";
import ViewSubjects from "./pages/ViewSubjects";
import ViewCourses from "./pages/ViewCourses";
import { TeacherContextProvider } from "./context/Teachers";
import { SubjectContextProvider } from "./context/Subjects";
import { ChapterContextProvider } from "./context/Chapter";
import ViewChapters from "./pages/ViewChapters";
import { CourseContextProvider } from "./context/Courses";

function App() {
  return (
    <>
      <TeacherContextProvider>
        <CourseContextProvider>
          <SubjectContextProvider>
            <ChapterContextProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/admission" element={<AdmissionPage />} />
                  <Route
                    path="/admin/admissions"
                    element={<ViewAdmissions />}
                  />
                  <Route
                    path="/admin/admissions/:_id"
                    element={<AdmissionPage />}
                  />
                  <Route path="/admin/teachers" element={<ViewTeachers />} />
                  <Route path="/admin/subjects" element={<ViewSubjects />} />
                  <Route path="/admin/chapters" element={<ViewChapters />} />
                  <Route path="/admin/courses" element={<ViewCourses/>}/>
                </Routes>
              </Router>
            </ChapterContextProvider>
          </SubjectContextProvider>
        </CourseContextProvider>
      </TeacherContextProvider>
    </>
  );
}

export default App;
