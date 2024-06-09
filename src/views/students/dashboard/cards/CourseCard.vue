<template>
  <div class="course-list">
    <h1>Courses</h1>
    <table>
      <thead>
        <tr>
          <th>SNo.</th>
          <th>Course Image</th>
          <th>Course Name</th>
          <th>Course Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in myCourse" :key="course.id">
          <td>{{ index + 1 }}</td>
          <td><img :src="course.img" alt="course-image" /></td>
          <td>{{ course.name }}</td>
          <td class="desc">{{ course.description }}</td>
          <td class="buttonsDiv">
            <button
              type="button"
              class="button viewButton"
              @click="viewCourse(String(course.id))"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path
                  d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type {
  courseInterface,
  studentInterface,
} from "../../../../interfaces/interface";

const router = useRouter();
const myCourse = ref<courseInterface[]>([]);
const activeUser = localStorage.getItem("activeUser");
console.log(activeUser);

onMounted(() => {
  const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");

  let student: studentInterface;
  const users = JSON.parse(localStorage.getItem("userData") || "[]");
  users.forEach((user: studentInterface) => {
    if (activeUser == user.id) {
      student = user;
      console.log(student.courses);
      student.courses.forEach((courseId) => {
        storedCourses.forEach((course: courseInterface) => {
          if (courseId == course.id) {
            myCourse.value.push(course);
          }
        });
      });
    }
  });
});

function viewCourse(courseId: string) {
  router.push({ name: "IntoQuiz", params: { id: courseId } });
}
</script>

<style scoped>
.course-list {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
}

table {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  overflow-x: auto;
}

thead {
  background-color: #f5f5f5;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  word-wrap: break-word;
}

td img {
  display: block;
  margin: 0 auto;
  max-height: 50px;
  width: auto;
  border-radius: 8px;
}

td .desc {
  max-height: 4rem;
  overflow-y: auto;
  line-height: 1.5;
  text-align: justify;
}

td.desc::-webkit-scrollbar {
  width: 6px;
}

td.desc::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}

td.desc::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.buttonsDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 5rem;
}

.button {
  padding: 6px 6px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button svg {
  height: 20px;
}

.viewButton {
  background-color: #4693eb;
  color: #fff;
}

.viewButton:hover {
  background-color: #1a6fd4;
}
</style>
