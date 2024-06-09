<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="side-bar-content">
        <div
          class="courses"
          @click="selectSection('courses')"
          :class="{ selected: selectedSection === 'courses' }"
        >
          <div class="horizontal-left"></div>
          <h3>
            Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"
              />
            </svg>
          </h3>
        </div>
        <div
          class="students"
          v-if="studentsButton"
          @click="selectSection('students')"
          :class="{ selected: selectedSection === 'students' }"
        >
          <div class="horizontal-left"></div>
          <h3>
            Students
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path
                d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
              />
            </svg>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "../routes/index";
defineProps({
  studentsButton: {
    type: Boolean,
  },
});
const selectedSection = ref<string | null>("courses");

if (router.currentRoute.value.fullPath === "/dashboard/teacher/students") {
  selectedSection.value = "students";
}

function selectSection(section: string) {
  let currentRoute: string;
  if (router.currentRoute.value.fullPath.includes("teacher")) {
    currentRoute =
      section === "courses"
        ? "/dashboard/teacher/courses"
        : "/dashboard/teacher/students";
  } else {
    currentRoute = "/dashboard/student";
  }
  router.push(currentRoute);
}
</script>
<style scoped>
@keyframes fillFromRight {
  from {
    width: 0;
    height: 100%;
  }
  to {
    width: 100%;
    height: 100%;
  }
}
.wrapper {
  height: 92vh;
  width: 15vw;
  display: flex;
  background-color: #9f96e23b;
}
.sidebar {
  letter-spacing: 2px;
  font-weight: 700;
  color: rgb(2, 2, 2);
  height: 92vh;
  width: 100%;
}
.side-bar-content {
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.horizontal-left {
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}
.students,
.courses {
  height: 20%;
  width: 100%;
  background-color: white;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #3b5998;
  overflow: hidden;
  position: relative;
}
.students h3,
.courses h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 25px;
  position: relative;
  z-index: 1;
}
.students::before,
.courses::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  width: 0;
  transition: width 0.3s ease;
}
.students.selected::before,
.courses.selected::before {
  width: 95%;
}
.students.selected,
.courses.selected {
  color: #3b5998;
}
.courses.selected svg {
  fill: black;
}
.students.selected svg {
  fill: black;
}
.students.selected > .horizontal-left,
.courses.selected > .horizontal-left {
  background-color: #3b5998;
}

@media screen and (max-width:468px){
    .wrapper{
      width:200px;
      background-color: #9f96e2;
      z-index: 999;
      position:absolute;
    }
}
</style>
