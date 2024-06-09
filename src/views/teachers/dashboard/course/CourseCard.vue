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
        <tr v-for="(course, index) in courses" :key="course.id">
          <td>{{ index + 1 }}</td>
          <td><img :src="course.img" alt="course-image" /></td>
          <td>{{ course.name }}</td>
          <td class="desc">{{ course.description }}</td>
          <td class="buttonsDiv">
            <button
              type="button"
              class="button editButton"
              @click="openEditModal(course)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path
                  d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="button deleteButton"
              @click="deleteCourse(String(course.id))"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
            </button>
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
    <EditCourseModal
      :isOpen="isEditModalOpen"
      :course="selectedCourse"
      @close="closeEditModal"
      @save="saveEditedCourse"
      @updateCourseList="updateCourseList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EditCourseModal from "./EditCourseModal.vue";
import { useRouter } from "vue-router";
import type { courseInterface } from "../../../../interfaces/interface";

const router = useRouter();
const courses = ref<courseInterface[]>([]);
const isEditModalOpen = ref(false);
const selectedCourse = ref<courseInterface | null>(null);
const activeUser = localStorage.getItem("activeUser");

onMounted(() => {
  const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
  storedCourses.forEach((course: courseInterface) => {
    if (activeUser === course.teacherId) {
      courses.value.push(course);
    }
  });
});

function deleteCourse(courseId: string) {
  let deleteCourse = confirm("Confirm delete");
  if (deleteCourse) {
    courses.value = courses.value.filter(
      (course) => String(course.id) !== courseId
    );
    localStorage.setItem("courses", JSON.stringify(courses.value));
  }
}

function viewCourse(courseId: string) {
  router.push({ name: "EditCourse", params: { id: courseId } });
}

const openEditModal = (course: courseInterface) => {
  selectedCourse.value = course;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveEditedCourse = ({
  courseId,
  updatedCourse,
}: {
  courseId: string;
  updatedCourse: courseInterface;
}) => {
  const index = courses.value.findIndex((course) => course.id === courseId);
  if (index !== -1) {
    courses.value[index] = updatedCourse;
    localStorage.setItem("courses", JSON.stringify(courses.value));
  }
  closeEditModal();
};
const updateCourseList = (updatedCourses: courseInterface[]) => {
  courses.value = updatedCourses;
};
</script>

<style scoped>
.course-list {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
}

table {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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
  padding: 6px;
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

.editButton {
  background-color: #99d159;
  color: #fff;
}

.editButton:hover {
  background-color: #6da22b;
}

.deleteButton {
  background-color: #f56c4a;
  color: #fff;
}

.deleteButton:hover {
  background-color: #d13a14;
}

.viewButton {
  background-color: #4693eb;
  color: #fff;
}

.viewButton:hover {
  background-color: #1a6fd4;
}

@media (max-width: 768px) {
  th,
  td {
    padding: 8px;
    font-size: 0.9rem;
  }

  td img {
    max-height: 40px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .buttonsDiv {
    height: auto;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .button {
    padding: 4px;
    margin: 2px;
  }

  .button svg {
    height: 16px;
  }
}

@media (max-width: 480px) {
  th,
  td {
    padding: 6px;
    font-size: 0.8rem;
  }

  td img {
    max-height: 30px;
  }

  h1 {
    font-size: 1.2rem;
  }

  .buttonsDiv {
    flex-direction: column;
    gap: 0.2rem;
  }

  .button {
    padding: 3px;
    margin: 1px;
  }

  .button svg {
    height: 14px;
  }
}
</style>
