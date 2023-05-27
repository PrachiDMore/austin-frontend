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
import ViewBatch from "./pages/ViewBatch";
import { TeacherContextProvider } from "./context/Teachers";
import { SubjectContextProvider } from "./context/Subjects";
import { ChapterContextProvider } from "./context/Chapter";
import ViewChapters from "./pages/ViewChapters";
import { CourseContextProvider } from "./context/Courses";
import { BatchesContextProvider } from './context/Batches'
import { ThemeContextProvider } from "./context/Theme";
import { BranchContextProvider } from "./context/Branch";
import ViewBranch from "./pages/ViewBranch";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <TeacherContextProvider>
          <CourseContextProvider>
            <SubjectContextProvider>
              <ChapterContextProvider>
                <BatchesContextProvider>
                  <BranchContextProvider>
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
                        <Route path="/admin/courses" element={<ViewCourses />} />
                        <Route path="/admin/batches" element={<ViewBatch />} />
                        <Route path="/admin/branch" element={<ViewBranch />} />
                      </Routes>
                    </Router>
                  </BranchContextProvider>
                </BatchesContextProvider>
              </ChapterContextProvider>
            </SubjectContextProvider>
          </CourseContextProvider>
        </TeacherContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
