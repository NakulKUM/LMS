<template>
  <div class="entry-page">
    <Header :headerOpen="true" />
    <div class="entry-content">
      <h2>Welcome to the Quiz for <span class="course-name">{{ course.name }}</span></h2>
      <div class="instructions">
        <p>Please read the instructions carefully before starting the quiz:</p>
        <ul>
          <li>You can only take this quiz once.</li>
          <li>Ensure a stable internet connection.</li>
          <li>Answer all questions to the best of your ability.</li>
          <li>Once submitted, you cannot retake the quiz.</li>
        </ul>
      </div>
      <p>Number of questions: {{ course.questions.length }}</p>
      <button @click="startQuiz" class="start-button" :disabled="hasTakenQuiz">
        Start Quiz
      </button>
      <p v-if="hasTakenQuiz" class="error-message">
        You have already taken this quiz.
      </p>
    </div>
    <button @click="backtoDashboard" class="back-button">
      Back
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../../../../components/Header.vue";

const route = useRoute();
const router = useRouter();
const courseId = Array.isArray(route.params.courseId)
  ? route.params.id[0]
  : route.params.id;

function loadCourses() {
  const coursesFromStorage = localStorage.getItem('courses');
  if (coursesFromStorage) {
    return JSON.parse(coursesFromStorage);
  }
  return [];
}

const courses = ref(loadCourses());

const course = reactive({
  id: 0,
  name: "",
  questions: [],
});

const hasTakenQuiz = ref(false);

onMounted(() => {
  const foundCourse = courses.value.find((c: any) => c.id === parseInt(String(courseId)));
  if (foundCourse) {
    Object.assign(course, foundCourse);
    checkIfQuizTaken();
  } else {
    console.warn('Course not found');
  }
});

function checkIfQuizTaken() {
  const activeUser = localStorage.getItem('activeUser');
  const quizStatus = localStorage.getItem(`quizTaken_${courseId}${activeUser}`);
  hasTakenQuiz.value = quizStatus === 'true';
}

function startQuiz() {
  const quizStart = confirm("Are you sure you want to start");
  if (quizStart) {
    if (!hasTakenQuiz.value) {
      router.push({ name: "Quiz", params: { courseId } });
    }
  }
}

function backtoDashboard() {
  router.push("/dashboard/student");
}
</script>

<style scoped>
.entry-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  position: relative;
}

.entry-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-weight: bold;
}

.course-name {
  color: #3b5998;
}

.instructions {
  margin-bottom: 20px;
  text-align: left;
}

ul {
  padding-left: 20px;
  list-style-type: disc;
}

li {
  margin-bottom: 10px;
}

.start-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

.start-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  margin-top: 20px;
  color: red;
}

.back-button {
  position: absolute;
  top: 115px;
  left: 48px;
  padding: 10px 20px;
  background-color: #3b5998;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
</style>
