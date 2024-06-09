<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true"  @toggle-sidebar="toggleSidebar"/>
    <div class="dash-board-main-body">
      <Sidebar  v-if="sidebarOpen"/>
      <div class="content-area">
        <div class="course-data">
          <CouseCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "../components/Header.vue";
import Sidebar from "../components/SideBar.vue";
import CouseCard from "../views/students/dashboard/cards/CourseCard.vue";

const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
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
.course-data {
  height: 100%;
  width: 100%;
}
</style>