<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true" @toggle-sidebar="toggleSidebar"></Header>
    <div class="dash-board-main-body">
      <Sidebar :studentsButton="true" v-if="sidebarOpen" />
      <div class="student-area">
        <div class="student-data">
          <div class="add-icon" @click="moveToAddStudent">
            <p>Add Student</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#000000"
            >
              <path
                d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.27 200q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"
              />
            </svg>
          </div>
        </div>
        <div class="studentTable">
          <div class="wrapperTableNHeading">
            <div class="tableHeading">
              <h1>Students</h1>
            </div>
            <div class="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tr v-for="(student, index) in studentList" :key="student.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.name }}</td>
                  <td>
                    <ol>
                      <li v-for="courseId in student.courses" :key="courseId">
                        {{ getCourseName(Number(courseId)) }}
                      </li>
                    </ol>
                  </td>
                  <td class="actions">
                    <button class="edit" @click="openEditModal(student)">
                      Edit
                    </button>
                    <button
                      class="delete"
                      @click="handleDelete(Number(student.id))"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </table>
              <EditStudentCourses
                v-if="isEditModalOpen && nonNullSelectedStudent"
                @close="closeEditModal"
                :student="nonNullSelectedStudent"
                :courses="availableCourses"
                @update="updateStudent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Header from "../../../../components/Header.vue";
import Sidebar from "../../../../components/SideBar.vue";
import EditStudentCourses from "./EditStudentCourse.vue";
import { useRouter } from "vue-router";
import {
  courseInterface,
  studentInterface,
} from "../../../../interfaces/interface";
const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

const router = useRouter();
const activeTeacher = localStorage.getItem("activeUser");
const userData = localStorage.getItem("userData");
const users = ref<studentInterface[] | null>(
  userData ? JSON.parse(userData) : ["No data available"]
);
let studentList = computed<studentInterface[] | null>(() => {
  let data = users.value!.filter((element: any) => {
    return activeTeacher === element.teacherId;
  });
  return data;
});

const coursesData = localStorage.getItem("courses");
const availableCourses: courseInterface[] = coursesData
  ? JSON.parse(coursesData)
  : [];

const isEditModalOpen = ref(false);
const selectedStudent = ref<studentInterface | null>(null);

const nonNullSelectedStudent = computed<studentInterface | null>(() => {
  return selectedStudent.value ? selectedStudent.value : null;
});

function moveToAddStudent() {
  router.push("/dashboard/teacher/addStudent");
}

function handleDelete(id: Number) {
  let deleteUser = confirm("Are you sure you want to delete this student");
  if (deleteUser) {
    let updatedStudentUser = users.value!.filter((element: any) => {
      return element.id !== id;
    });
    localStorage.setItem("userData", JSON.stringify(updatedStudentUser));
    users.value = updatedStudentUser;
  }
}

function getCourseName(courseId: number): string {
  const course = availableCourses.find((c) => c.id === courseId);
  return course ? course.name : "";
}

function openEditModal(student: studentInterface) {
  selectedStudent.value = student;
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
  selectedStudent.value = null;
}

function updateStudent(updatedStudent: studentInterface) {
  const index = users.value!.findIndex(
    (user: studentInterface) => user.id === updatedStudent.id
  );
  if (index !== -1) {
    users.value![index] = updatedStudent;
    localStorage.setItem("userData", JSON.stringify(users.value));
  }
}
</script>

<style scoped>
.studentTable {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.wrapperTableNHeading {
  padding: 4rem;
  width: 100%;
  overflow: hidden;
}

table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

th {
  height: 70px;
  text-align: center;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  position: sticky;
  top: 0;
}

td {
  text-align: center;
  padding: 10px;
}

li {
  list-style: none;
}

.actions {
  height: 100%;
}

.edit {
  background-color: green;
  color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  font-weight: 500;
  margin-right: 10px;
}

.delete {
  background-color: rgb(246, 4, 4);
  color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  font-weight: 500;
  margin-right: 10px;
}

.edit:hover {
  background-color: darkgreen;
}

.delete:hover {
  background-color: darkred;
}

.tableContainer {
  height: 69vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.tableContainer::-webkit-scrollbar {
  width: 8px;
}

.tableContainer::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.tableContainer::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.tableContainer::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.tableContainer thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #4a90e2;
}

h1 {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: -2rem;
  color: #3b5998;
  text-decoration: underline;
}

.dashboard-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.dash-board-main-body {
  height: calc(100vh - 60px);
  width: 100vw;
  display: flex;
}

.student-area {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
}

.add-icon {
  cursor: pointer;
  position: absolute;
  right: 2.4rem;
  top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: blue;
  gap: 5px;
  padding: 6px;
  height: 45px;
  width: 180px;
  font-size: 18px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.add-icon:hover {
  opacity: 1;
  transform: scale(1.05);
}

.add-icon svg {
  fill: white;
  height: 30px;
}

.addCourse {
  position: absolute;
  right: 5rem;
}

.course-data {
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 880px) {
  .dashboard-wrapper {
    height: auto;
  }

  .studentTable {
    width: 100%;
  }

  .wrapperTableNHeading {
    padding: 2rem;
  }

  th,
  td {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  .add-icon {
    right: 2rem;
    width: 50px;
    height: 50px;
    opacity: 0.6;
  }

  .add-icon:hover {
    opacity: 1;
  }

  .add-icon p {
    display: none;
  }

  .tableContainer th,
  .tableContainer td {
    padding: 0.25rem;
  }
}

@media screen and (max-width: 430px) {
  .dashboard-wrapper {
    height: auto;
  }

  .studentTable {
    width: 100%;
  }

  .wrapperTableNHeading {
    padding: 0;
  }

  th,
  td {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  .add-icon {
    right: 1rem;
  }

  .tableHeading h1 {
    font-size: 2rem;
    margin-top: 0;
  }
}
</style>
