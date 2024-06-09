<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Edit Courses for {{ student.name }}</h2>
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
      </div>
      <button @click="saveChanges">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  courseInterface,
  studentInterface,
} from "../../../../interfaces/interface";

const props = defineProps<{
  student: studentInterface;
  courses: courseInterface[];
}>();
const emit = defineEmits(["close", "update"]);

const selectedCourses = ref<string[]>([]);
const activeTeacher = localStorage.getItem("activeUser");
const courses = localStorage.getItem("courses");
const availableCourses: courseInterface[] = [];
const coursesData = courses ? JSON.parse(courses) : [];

coursesData.forEach((element: courseInterface) => {
  if (activeTeacher === element.teacherId) {
    availableCourses.push(element);
  }
});

onMounted(() => {
  selectedCourses.value = [...props.student.courses];
});

function saveChanges() {
  const updatedStudent = { ...props.student, courses: selectedCourses.value };
  let userData = JSON.parse(localStorage.getItem("userData") || "[]");
  const studentIndex = userData.findIndex(
    (user: studentInterface) => user.id === props.student.id
  );
  if (studentIndex !== -1) {
    userData[studentIndex] = updatedStudent;
    localStorage.setItem("userData", JSON.stringify(userData));
    emit("update", updatedStudent);
  }
  emit("close");
}
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}

.close:hover {
  color: red;
}

h2 {
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
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
  padding: 10px 15px;
  background-color: #8c2dcf;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

button:hover {
  background-color: #3a0069;
}

.error-msg {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
