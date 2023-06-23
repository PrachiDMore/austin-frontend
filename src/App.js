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
import TeacherProfile from "./pages/teacher/TeacherProfile";
import StudentAdmissionPage from "./pages/student/StudentAdmissionPage";
import TeacherChapters from "./pages/teacher/TeacherChapters";
import TeacherBatches from "./pages/teacher/TeacherBatches";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import BranchManager from "./pages/BranchManager";
import { BranchManagerContextProvider } from "./context/BranchManager";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import BranchManagerProfile from "./pages/branch-manager/BranchManagerProfile";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <UserContextProvider>
            <BranchManagerContextProvider>
              <ThemeContextProvider>
                <TeacherContextProvider>
                  <BatchesContextProvider>
                    <CourseContextProvider>
                      <SubjectContextProvider>
                        <ChapterContextProvider>
                          <BranchContextProvider>
                            <ChapterAllocationContextProvider>
                              <AdmissionContextProvider>
                                <Routes>
                                  <Route path="/signup" element={<Signup />} />
                                  <Route path="/reset-password" element={<ForgetPassword />} />
                                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                                  <Route path="/signin" element={<Signin />} />
                                  <Route path="/admission" element={<AdmissionPage />} />
                                  <Route element={<ProtectedRoutes role={`${process.env.REACT_APP_STUDENT_ROLE}`} />}>
                                    <Route path="/student/profile" element={<StudentAdmissionPage />} />
                                    <Route path="/student/batches" element={<ViewEnrolledBatches />} />
                                    <Route path="/student/courses" element={<StudentEnrolledCourse />} />
                                    <Route path="/student/chapters" element={<StudentCourseChapters />} />
                                  </Route>
                                  <Route element={<ProtectedRoutes role={`${process.env.REACT_APP_BRANCH_MANAGER_ROLE}`} />}>
                                    <Route path="/branch-manager/profile" element={<BranchManagerProfile />} />
                                    <Route path="/branch-manager/batches" element={<BranchManagerProfile />} />
                                  </Route>
                                  <Route element={<ProtectedRoutes role={`${process.env.REACT_APP_ADMIN_ROLE}`} />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/admin/roles" element={<Roles />} />
                                    <Route path="/admin/branch-manager" element={<BranchManager />} />
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
                                    <Route path="/admin/chapter-allocation" element={<ChapterAllocation />} />
                                    <Route path="/admin/subjects" element={<ViewSubjects />} />
                                    <Route path="/admin/chapters" element={<ViewChapters />} />
                                    <Route path="/admin/courses" element={<ViewCourses />} />
                                    <Route path="/admin/batches" element={<ViewBatch />} />
                                  </Route>
                                  <Route element={<ProtectedRoutes role={`${process.env.REACT_APP_TEACHER_ROLE}`} />}>
                                    <Route path="/teacher" element={<Home />} />
                                    <Route path="/teacher/profile" element={<TeacherProfile />} />
                                    <Route path="/teacher/batches" element={<TeacherBatches />} />
                                    <Route path="/teacher/chapters" element={<TeacherChapters />} />
                                    <Route path="/teacher/courses" element={<TeacherCourses />} />
                                  </Route>
                                </Routes>
                              </AdmissionContextProvider>
                            </ChapterAllocationContextProvider>
                          </BranchContextProvider>
                        </ChapterContextProvider>
                      </SubjectContextProvider>
                    </CourseContextProvider>
                  </BatchesContextProvider>
                </TeacherContextProvider>
              </ThemeContextProvider>
            </BranchManagerContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
