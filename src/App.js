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
import { ChapterAllocationContextProvider } from "./context/ChapterAllocation";
import ChapterAllocation from "./pages/ChapterAllocation";
import { AdmissionContextProvider } from "./context/Admission";
import { AuthContextProvider } from "./context/Authentication";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ViewEnrolledBatches from "./pages/student/ViewEnrolledBatches";
import StudentCourseChapters from "./pages/student/StudentCourseChapters";
import StudentEnrolledCourse from "./pages/student/StudentEnrolledCourse";
import { UserContextProvider } from "./context/Users";
import Roles from "./pages/Roles";

function App() {
  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <TeacherContextProvider>
              <BatchesContextProvider>
                <CourseContextProvider>
                  <SubjectContextProvider>
                    <ChapterContextProvider>
                      <BranchContextProvider>
                        <ChapterAllocationContextProvider>
                          <AdmissionContextProvider>
                            <Router>
                              <Routes>
                                <Route element={<ProtectedRoutes role="student" />}>
                                  <Route path="/student/profile" element={<AdmissionPage />} />
                                  <Route path="/student/batches" element={<ViewEnrolledBatches />} />
                                  <Route path="/student/courses" element={<StudentEnrolledCourse />} />
                                  <Route path="/student/chapters" element={<StudentCourseChapters />} />
                                </Route>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/admission" element={<AdmissionPage />} />
                                <Route element={<ProtectedRoutes role={'admin'} />}>
                                  <Route path="/" element={<Home />} />
                                  <Route path="/admin/roles" element={<Roles />} />
                                  <Route
                                    path="/admin/admissions"
                                    element={<ViewAdmissions />}
                                  />
                                  <Route
                                    path="/admin/admissions/:_id"
                                    element={<AdmissionPage />}
                                  />
                                  <Route path="/admin/teachers" element={<ViewTeachers />} />
                                  <Route path="/admin/branch" element={<ViewBranch />} />
                                </Route>
                                <Route path="/admin/chapter-allocation" element={<ChapterAllocation />} />
                                <Route path="/admin/subjects" element={<ViewSubjects />} />
                                <Route path="/admin/chapters" element={<ViewChapters />} />
                                <Route path="/admin/courses" element={<ViewCourses />} />
                                <Route path="/admin/batches" element={<ViewBatch />} />
                                <Route path="/signin" element={<Signin />} />
                              </Routes>
                            </Router>
                          </AdmissionContextProvider>
                        </ChapterAllocationContextProvider>
                      </BranchContextProvider>
                    </ChapterContextProvider>
                  </SubjectContextProvider>
                </CourseContextProvider>
              </BatchesContextProvider>
            </TeacherContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
