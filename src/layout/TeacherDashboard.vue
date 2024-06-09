<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true" @toggle-sidebar="toggleSidebar" />
    <div class="dash-board-main-body">
      <Sidebar :studentsButton="true" v-if="sidebarOpen" />
      <div class="content-area">
        <div class="course-data">
          <CourseCard />
        </div>
      </div>
      <div class="add-icon" @click="moveToAddCourse">
        <p>Add course</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#ffffff"
        >
          <path
            d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.27 200q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourseCard from "../views/teachers/dashboard/course/CourseCard.vue";
import Header from "../components/Header.vue";
import Sidebar from "../components/SideBar.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function moveToAddCourse() {
  router.push("/dashboard/teacher/addCourse");
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
.add-icon {
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: blue;
  gap: 5px;
  padding: 6px;
  height: 45px;
  width: 150px;
  font-size: 18px;
  border-radius: 15px;
}
.course-data {
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 900px) {
  .add-icon {
    right: 2rem;
    width: 50px;
    height: 50px;
    opacity: 60%;
  }
  .add-icon:hover {
    opacity: 100%;
  }
  .add-icon p {
    display: none;
  }
}
@media screen and (max-width: 480px) {
  .add-icon {
    right: 1rem;
  }
}
</style>
