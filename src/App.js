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
import TeacherProfile from "./pages/teacher/TeacherProfile";
import StudentAdmissionPage from "./pages/student/StudentAdmissionPage";
import TeacherChapters from "./pages/teacher/TeacherChapters";
import TeacherBatches from "./pages/teacher/TeacherBatches";
import IndividualTeacherBatches from "./pages/teacher/IndividualTeacherBatches";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import BranchManager from "./pages/BranchManager";
import { BranchManagerContextProvider } from "./context/BranchManager";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import BranchManagerProfile from "./pages/branch-manager/BranchManagerProfile";
import Attendance from "./pages/Attendance";
import IndividualAttendance from "./pages/IndividualAttendance";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import { AttendanceContextProvider } from "./context/Attendance";
import IndividualBatches from "./pages/IndividualBatches";
import IndividualChapterAllocation from "./pages/IndividualChapterAllocation";
import IndividualTeacherAttendance from "./pages/teacher/IndividualTeacherAttendance";
import ViewEnrolledIndividualBatches from "./pages/student/ViewEnrolledIndividualBatches";
import StudentCourseIndividualChapters from "./pages/student/StudentCourseIndividualChapters";
import TeacherIndividualChapters from "./pages/teacher/TeacherIndividualChapters";
import BranchManagerIndividualBatches from "./pages/branch-manager/BranchManagerIndividualBatches";
import BranchManagerViewBatch from "./pages/branch-manager/BranchManagerViewBatch";
import BranchManagerIndividualAttendance from "./pages/branch-manager/BranchManagerIndividualAttendance";
import BranchChapterAllocation from "./pages/branch-manager/BranchChapterAllocation";
import BranchManagerIndividualChapterAllocation from "./pages/branch-manager/BranchManagerIndividualChapterAllocation";
import BranchManagerAttendance from "./pages/branch-manager/BranchManagerAttendance";
import BranchManagerAdmissionPage from "./pages/branch-manager-viewer/BranchManagerAdmissionPage";
import { BranchManagerViewerContextProvider } from "./context/BranchManagerViewer";
import BranchManagerViewerProfile from "./pages/branch-manager-viewer/BranchManagerViewerProfile";
import BranchManagerViewerChapterAllocation from "./pages/branch-manager-viewer/BranchManagerViewerChapterAllocation";
import BranchManagerViewerIndividualChapterAllocation from "./pages/branch-manager-viewer/BranchManagerViewerIndividualChapterAllocation";
import BranchManagerViewerBatch from "./pages/branch-manager-viewer/BranchManagerViewerBatch";
import BranchManagerViewerIndividualBatches from "./pages/branch-manager-viewer/BranchManagerViewerIndividualBatches";
import BranchManagerViewerAttendance from "./pages/branch-manager-viewer/BranchManagerViewerAttendance";
import BranchManagerViewerIndividualAttendance from "./pages/branch-manager-viewer/BranchManagerViewerIndividualAttendance";
import BranchManagerViewer from "./pages/BranchManagerViewer";
import RulesAndRegulationsPage from "./pages/RulesAndRegulationsPage";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <UserContextProvider>
            <BranchManagerContextProvider>
              <BranchManagerViewerContextProvider>
                <ThemeContextProvider>
                  <TeacherContextProvider>
                    <BatchesContextProvider>
                      <CourseContextProvider>
                        <SubjectContextProvider>
                          <ChapterContextProvider>
                            <BranchContextProvider>
                              <ChapterAllocationContextProvider>
                                <AdmissionContextProvider>
                                  <AttendanceContextProvider>
                                    <Routes>
                                      {/* <Route path="*" element={<PageNotFound />} /> */}
                                      <Route path="/signup" element={<Signup />} />
                                      <Route path="/reset-password" element={<ForgetPassword />} />
                                      <Route path="/reset-password/:token" element={<ResetPassword />} />
                                      <Route path="/signin" element={<Signin />} />
                                      <Route path="/admission" element={<AdmissionPage />} />
                                      <Route path="/rules-and-regulations" element={<RulesAndRegulationsPage />} />
                                      <Route element={<ProtectedRoutes role={[`${process.env.REACT_APP_STUDENT_ROLE}`]} />}>
                                        <Route path="/student/profile" element={<StudentAdmissionPage />} />
                                        <Route path="/student/batches" element={<ViewEnrolledBatches />} />
                                        <Route path="/student/individual-batches" element={<ViewEnrolledIndividualBatches />} />
                                        <Route path="/student/courses" element={<StudentEnrolledCourse />} />
                                        <Route path="/student/chapters" element={<StudentCourseChapters />} />
                                        <Route path="/student/individual-chapters" element={<StudentCourseIndividualChapters />} />
                                      </Route>
                                      <Route path="/admin/branch-manager" element={<BranchManager />} />
                                      <Route path="/admin/branch-manager-viewer" element={<BranchManagerViewer />} />
                                      <Route element={<ProtectedRoutes role={[`${process.env.REACT_APP_ADMIN_ROLE}`]} />}>
                                        <Route path="/" element={<Home />} />
                                        {/* <Route path="/admin/roles" element={<Roles />} /> */}
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
                                        <Route path="/admin/individual-chapter-allocation" element={<IndividualChapterAllocation />} />
                                        <Route path="/admin/subjects" element={<ViewSubjects />} />
                                        <Route path="/admin/chapters" element={<ViewChapters />} />
                                        <Route path="/admin/courses" element={<ViewCourses />} />
                                        <Route path="/admin/batches" element={<ViewBatch />} />
                                        <Route path="/admin/individual-batches" element={<IndividualBatches />} />
                                        <Route path="/admin/attendance" element={<Attendance />} />
                                        <Route path="/admin/individual-attendance" element={<IndividualAttendance />} />
                                      </Route>
                                      {/* Viewer */}
                                      <Route element={<ProtectedRoutes role={[, `${process.env.REACT_APP_BRANCH_MANAGER_VIEWER_ROLE}`]} />}>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/branch-manager-viewer/profile" element={<BranchManagerViewerProfile />} />
                                        {/* <Route path="/admin/roles" element={<Roles />} /> */}
                                        <Route
                                          path="/branch-manager-viewer/admissions"
                                          element={<ViewAdmissions />}
                                        />
                                        <Route
                                          path="/branch-manager-viewer/admissions/:_id"
                                          element={<BranchManagerAdmissionPage />}
                                        />
                                        <Route path="/branch-manager-viewer/teachers" element={<ViewTeachers />} />
                                        <Route path="/branch-manager-viewer/chapters" element={<ViewChapters />} />
                                        <Route path="/branch-manager-viewer/subjects" element={<ViewSubjects />} />
                                        <Route path="/branch-manager-viewer/chapter-allocation" element={<BranchManagerViewerChapterAllocation />} />
                                        <Route path="/branch-manager-viewer/individual-chapter-allocation" element={<BranchManagerViewerIndividualChapterAllocation />} />
                                        <Route path="/branch-manager-viewer/courses" element={<ViewCourses />} />
                                        <Route path="/branch-manager-viewer/batches" element={<BranchManagerViewBatch />} />
                                        <Route path="/branch-manager-viewer/individual-batches" element={<BranchManagerViewerIndividualBatches />} />
                                        <Route path="/branch-manager-viewer/attendance" element={<BranchManagerViewerAttendance />} />
                                        <Route path="/branch-manager-viewer/individual-attendance" element={<BranchManagerViewerIndividualAttendance />} />
                                      </Route>

                                      <Route element={<ProtectedRoutes role={[, `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}`]} />}>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/branch-manager/profile" element={<BranchManagerProfile />} />
                                        {/* <Route path="/admin/roles" element={<Roles />} /> */}
                                        <Route
                                          path="/branch-manager/admissions"
                                          element={<ViewAdmissions />}
                                        />
                                        <Route
                                          path="/branch-manager/admissions/:_id"
                                          element={<AdmissionPage />}
                                        />
                                        <Route path="/branch-manager/teachers" element={<ViewTeachers />} />
                                        <Route path="/branch-manager/chapters" element={<ViewChapters />} />
                                        <Route path="/branch-manager/subjects" element={<ViewSubjects />} />
                                        <Route path="/branch-manager/chapter-allocation" element={<BranchChapterAllocation />} />
                                        <Route path="/branch-manager/individual-chapter-allocation" element={<BranchManagerIndividualChapterAllocation />} />
                                        <Route path="/branch-manager/courses" element={<ViewCourses />} />
                                        <Route path="/branch-manager/batches" element={<BranchManagerViewerBatch />} />
                                        <Route path="/branch-manager/individual-batches" element={<BranchManagerIndividualBatches />} />
                                        <Route path="/branch-manager/attendance" element={<BranchManagerAttendance />} />
                                        <Route path="/branch-manager/individual-attendance" element={<BranchManagerIndividualAttendance />} />
                                      </Route>
                                      <Route element={<ProtectedRoutes role={[`${process.env.REACT_APP_TEACHER_ROLE}`]} />}>
                                        <Route path="/teacher" element={<Home />} />
                                        <Route path="/teacher/profile" element={<TeacherProfile />} />
                                        <Route path="/teacher/individual-batches" element={<IndividualTeacherBatches />} />
                                        <Route path="/teacher/batches" element={<TeacherBatches />} />
                                        <Route path="/teacher/chapters" element={<TeacherChapters />} />
                                        <Route path="/teacher/individual-chapters" element={<TeacherIndividualChapters />} />
                                        <Route path="/teacher/courses" element={<TeacherCourses />} />
                                        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
                                        <Route path="/teacher/individual-attendance" element={<IndividualTeacherAttendance />} />
                                      </Route>
                                    </Routes>
                                  </AttendanceContextProvider>
                                </AdmissionContextProvider>
                              </ChapterAllocationContextProvider>
                            </BranchContextProvider>
                          </ChapterContextProvider>
                        </SubjectContextProvider>
                      </CourseContextProvider>
                    </BatchesContextProvider>
                  </TeacherContextProvider>
                </ThemeContextProvider>
              </BranchManagerViewerContextProvider>
            </BranchManagerContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </Router >
    </>
  );
}

export default App;
