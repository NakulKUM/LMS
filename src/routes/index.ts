import { createWebHistory, createRouter } from "vue-router";
import LogIn from "../views/login/LogIn.vue";
import ForgotPassword from "../components/forgotPassword/ForgotPassword.vue";
import ChangePassword from "../components/Profile/ChangePassword.vue";
import Registration from "../views/registration/Registration.vue";
import TeacherDashboard from "../layout/TeacherDashboard.vue";
import StudentDashboard from "../layout/StudentDashboard.vue";
import TeacherProfile from "../components/Profile/ProfileSection.vue";
import Quiz from "../views/students/dashboard/quiz/Quiz.vue";
import IntoQuiz from "../views/students/dashboard/quiz/IntoQuiz.vue";
import TeacherStudentSection from "../views/teachers/dashboard/students/StudentSection.vue";
import AddCourse from "../views/teachers/dashboard/course/AddCourse.vue";
import AddStudent from "../views/teachers/dashboard/students/AddStudent.vue";
import EditProfile from "../components/Profile/EditProfile.vue";
import EditCourse from "../views/teachers/dashboard/course/EditCourse.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LogIn,
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/register",
    name: "registration",
    component: Registration,
  },
  {
    path: "/dashboard/teacher/addCourse",
    name: "add-course",
    component: AddCourse,
  },
  {
    path: "/dashboard/teacher/addStudent",
    name: "add-student",
    component: AddStudent,
  },
  {
    path: "",
    children: [
      {
        path: "/dashboard/teacher/courses",
        name: "teacher-dashboard",
        component: TeacherDashboard,
      },
      {
        path: "/dashboard/teacher/students",
        component: TeacherStudentSection,
        name: "teacher-dashboard/studentSection",
      },
    ],
  },
  {
    path: "/dashboard/student",
    name: "student-dashboard",
    component: StudentDashboard,
  },
  {
    path: "/dashboard/teacher/profile",
    component: TeacherProfile,
  },
  {
    path: "/dashboard/student/quiz/:courseId",
    name: "Quiz",
    component: Quiz,
    props: true,
  },
  {
    path: "/dashboard/student/:id",
    name: "IntoQuiz",
    component: IntoQuiz,
    props: true,
  },
  {
    path: "/profile/edit",
    name: "edit",
    component: EditProfile,
  },
  {
    path: "/course/:id",
    name: "EditCourse",
    component: EditCourse,
  },
  {
    path: "/dashboard/changePassword",
    name: "ChangePassword",
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
