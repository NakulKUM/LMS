<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true" />
    <div class="quiz">
      <div class="quiz-content">
        <h2>Quiz for {{ course.name }}</h2>
        <form @submit.prevent="submitQuiz">
          <div v-for="(question, qIndex) in course.questions" :key="qIndex" class="question-section">
            <label class="question-label">{{ qIndex + 1 }}. {{ question.question }}</label>
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="answer-section">
              <input type="radio" :name="'q' + qIndex" :id="'q' + qIndex + 'o' + oIndex" :value="option"
                v-model="selectedAnswers[qIndex]" />
              <label :for="'q' + qIndex + 'o' + oIndex">{{
                option
                }}</label>
            </div>
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </form>
        <div v-if="showScore" class="score-section">
          <h3>Your Score: {{ score }} / {{ course.questions.length }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../../../../components/Header.vue";
import { courseInterface, CourseQuiz, SelectedAnswers } from "../../../../interfaces/interface";



const route = useRoute();
const router = useRouter();
const courseId = route.params.courseId as string;

function loadCourses(): courseInterface[] {
  const coursesFromStorage = localStorage.getItem('courses');
  if (coursesFromStorage) {
    return JSON.parse(coursesFromStorage);
  }
  return [];
}


const courses = ref<courseInterface[]>(loadCourses());
console.log(courses.value);

const course = ref<CourseQuiz>({
  id: 0,
  name: "",
  questions: [],
});
const selectedAnswers = ref<SelectedAnswers>({});
const showScore = ref<boolean>(false);
const score = ref<number>(0);

onMounted(() => {
  const foundCourse = courses.value.find((c) => c.id === parseInt(courseId));
  if (foundCourse) {
    Object.assign(course.value, foundCourse);
    course.value.questions.forEach((_question, index) => {
      selectedAnswers.value[index] = "";
    });
  } else {
    console.warn('Course not found');
  }
});

function submitQuiz(): void {
  // Calculate score
  score.value = 0;
  course.value.questions.forEach((question, index) => {
    if (selectedAnswers.value[index] === question.correctAnswer) {
      score.value++;
    }
  });
  showScore.value = true;
  console.log("Selected Answers:", selectedAnswers.value);
  console.log("Score:", score.value);
  const activeUser = localStorage.getItem("activeUser");
  // Mark the quiz as taken
  localStorage.setItem(`quizTaken_${courseId}${activeUser}`, 'true');
  router.push({ name: "student-dashboard" });
  alert(`Your Score is :  ${score.value}`)
}
</script>

<style scoped>
.dashboard-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
}

.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quiz-content {
  width: 100%;
  max-width: 600px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.question-section {
  margin-bottom: 20px;
}

.question-label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.answer-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input[type="radio"] {
  margin-right: 10px;
}

label {
  margin: 0;
  color: #555;
}

.submit-button {
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

.submit-button:hover {
  background-color: #334d84;
}

.score-section {
  margin-top: 20px;
  text-align: center;
}
</style>
