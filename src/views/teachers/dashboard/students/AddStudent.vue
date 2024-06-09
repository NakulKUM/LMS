<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true"  @toggle-sidebar="toggleSidebar"/>
    <div class="dash-board-main-body">
      <SideBar :studentsButton="true" v-if="sidebarOpen"/>
      <div class="content-area">
        <div class="add-student-wrapper">
          <div class="close" @click="backToStudentList">&times;</div>
          <h1>Add New Student</h1>
          <form @submit="redirect">
            <div class="form-group">
              <label for="studentName">Name:</label>
              <input type="text" id="studentName" v-model="name" required />
              <span>{{ nameError }}</span>
            </div>

            <div class="form-group">
              <label for="studentEmail">Email:</label>
              <input type="text" id="studentEmail" v-model="email" required />
              <span>{{ emailError }}</span>
            </div>

            <div class="form-group">
              <label for="studentPassword">Password:</label>
              <input
                type="password"
                id="studentPassword"
                v-model="password"
                required
              />
              <span>{{ passwordError }}</span>
            </div>

            <div class="form-group">
              <label for="studentContact">Contact Number:</label>
              <input
                type="text"
                id="studentContact"
                v-model="contactNumber"
                required
              />
              <span>{{ contactNumberError }}</span>
            </div>

            <div class="form-group">
              <label>Courses:</label>
              <div class="checkbox-group">
                <div
                  v-for="course in availableCourses"
                  :key="course.id"
                  class="checkbox-item"
                >
                  <input
                    type="checkbox"
                    :id="'course-' + course.id"
                    :value="course.id"
                    v-model="selectedCourses"
                  />
                  <label :for="'course-' + course.id">{{ course.name }}</label>
                </div>
              </div>
              <span>{{ courseError }}</span>
            </div>

            <button type="submit">Add Student</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import Header from "../../../../components/Header.vue";
import SideBar from "../../../../components/SideBar.vue";
import {
  courseInterface,
  studentInterface,
} from "../../../../interfaces/interface";

const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

const name = ref("");
const email = ref("");
const contactNumber = ref("");
const password = ref("");
const selectedCourses = ref<string[]>([]);
const role = "Student";
const teacherId = localStorage.getItem("activeUser");

const nameError = ref("");
const emailError = ref("");
const contactNumberError = ref("");
const passwordError = ref("");
const courseError = ref("");

const router = useRouter();

const activeTeacher = localStorage.getItem("activeUser");
const courses = localStorage.getItem("courses");
const availableCourses: courseInterface[] = [];
const coursesData = courses ? JSON.parse(courses) : [];

coursesData.forEach((element: courseInterface) => {
  if (activeTeacher === element.teacherId) {
    availableCourses.push(element);
  }
});
const students = localStorage.getItem("userData");
const studentData = students ? JSON.parse(students) : [];

const backToStudentList = () => {
  router.push("/dashboard/teacher/students");
};

function validateName() {
  const regex = /[a-zA-Z\s]{5,}$/;
  if (name.value === "") {
    nameError.value = "Please enter name.";
  } else if (!regex.test(name.value)) {
    nameError.value =
      "Full name should be at least 6 characters long, and only contain alphabets";
  } else {
    nameError.value = "";
  }
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  studentData.forEach((element: studentInterface) => {
    if (email.value === "") {
      emailError.value = "Please enter email";
    } else if (email.value === element.email) {
      emailError.value = "user with this email already registered";
    } else if (!regex.test(email.value)) {
      emailError.value = "Please enter a valid email";
    } else {
      emailError.value = "";
    }
  });
}

function validatePassword() {
  if (password.value === "") {
    passwordError.value = "Please enter a password";
  } else if (password.value.length < 4) {
    passwordError.value = "Password should be at least 4 characters long";
  } else {
    passwordError.value = "";
  }
}

function validateContactNumber() {
  const regex = /^\d{10}$/;
  if (!regex.test(contactNumber.value)) {
    contactNumberError.value = "Not a valid contact number";
  } else {
    contactNumberError.value = "";
  }
}

function validateCourse() {
  if (selectedCourses.value.length === 0) {
    courseError.value = "Please select course";
  } else {
    courseError.value = "";
  }
}

function redirect(event: Event) {
  event.preventDefault();
  validateName();
  validateEmail();
  validatePassword();
  validateContactNumber();
  validateCourse();

  if (
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !contactNumberError.value &&
    !courseError.value
  ) {
    addStudent();
    router.push("/dashboard/teacher/students");
  }
}

function addStudent() {
  const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  userData.push({
    id: Date.now(),
    name: name.value,
    email: email.value,
    contactNumber: contactNumber.value,
    password: password.value,
    courses: selectedCourses.value,
    role: role,
    teacherId,
  });
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Student Registered Successfully!");
}
</script>

<style scoped>
.dashboard-wrapper {
  height: 100vh;
  width: 100vw;
}

.dash-board-main-body {
  height: 92vh;
  width: 100vw;
  background-color: rgb(255, 255, 255);
  display: flex;
}

.content-area {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;
}
.add-student-wrapper {
  max-width: 550px;
  margin: 0 auto;
  padding: 20px;
  background: #d4daf0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.add-student-wrapper h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
span {
  font-size: 12px;
  color: red;
}
input[type="text"],
input[type="date"],
select {
  width: calc(100% - 10px);
  padding: 4px;
  margin: 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
}

.checkbox-item {
  flex: 1 1 calc(50% - 20px);
  display: flex;
}

input[type="checkbox"] {
  margin-right: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.close {
  font-size: 25px;
  cursor: pointer;
  width: 1.5rem;
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
}
.close:hover {
  color: red;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .add-student-wrapper {
    padding: 10px;
  }

  select {
    width: 50%;
  }
}
</style>
