<template>
  <div class="question-area">
    <div class="edit-course">
      <h2 class="modal-header">Edit Course: {{ localCourseValue.name }}</h2>
      <button class="back-button" @click="backtoDashboard">Back</button>
      <form @submit.prevent="saveCourse">
        <div v-for="(question, qIndex) in localCourseValue.questions" :key="qIndex" class="question-section">
          <label>Question {{ qIndex + 1 }}:</label>
          <input :value="question.question" @input="updateQuestion($event, qIndex)" placeholder="Enter question text" />

          <div class="answers-section">
            <div v-for="(option, oIndex) in question.options" :key="oIndex" class="answer-section">
              <label>Option {{ oIndex + 1 }}:</label>
              <div class="option-input">
                <input :value="option" @input="updateOption($event, qIndex, oIndex)"
                  placeholder="Enter answer option" />
                <button class="remove-button" @click.prevent="removeOption(qIndex, oIndex)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path
                      d="M1.5 4.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5V5h-13v-.5zM3 6v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6H3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H8V2z" />
                  </svg>
                </button>
              </div>
            </div>
            <button class="add-button" @click.prevent="addOption(qIndex)">
              Add Option
            </button>
          </div>

          <label>Correct Answer:</label>
          <select :value="question.correctAnswer" @change="updateCorrectAnswer($event, qIndex)">
            <option v-for="(option, oIndex) in question.options" :key="oIndex" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button class="add-button" @click.prevent="addQuestion">
            Add Question
          </button>
          <button class="save-button" type="submit" :disabled="isSaveDisabled">
            Save
          </button>
        </div>
      </form>
    </div>

    <div v-if="saveError" class="error-message">
      {{ saveError }}
    </div>

    <div class="show-questions">
      <h2>Added Questions:</h2>
      <div v-if="
        localCourseValue.questions.length > 0 || storedQuestions.length > 0
      ">
        <!-- Show questions from local storage -->
        <div v-for="(question, qIndex) in storedQuestions" :key="qIndex" class="question-section">
          <h3>Question {{ qIndex + 1 }}:</h3>
          <p>{{ question.question }}</p>
          <ul class="answers-list">
            <li v-for="(option, oIndex) in question.options" :key="oIndex">
              {{ option }}
              <span v-if="question.correctAnswer === option" class="correct-answer">(Correct Answer)</span>
            </li>
          </ul>
          <button class="remove-button" @click.prevent="removeStoredQuestion(qIndex)">
            Remove Question
          </button>
        </div>

        <div v-if="localCourseValue.questions.length > 0">
          <div v-for="(question, qIndex) in localCourseValue.questions" :key="qIndex" class="question-section">
            <h3>Question {{ storedQuestions.length + qIndex + 1 }}:</h3>
            <p class="question">{{ question.question }}</p>
            <ul class="answers-list">
              <li v-for="(option, oIndex) in question.options" :key="oIndex">
                {{ option }}
                <span v-if="question.correctAnswer === option" class="correct-answer">(Correct Answer)</span>
              </li>
            </ul>
            <button class="remove-button" @click.prevent="removeLocalQuestion(qIndex)">
              Remove Question
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No questions found for this course.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { courseInterface, Question } from "../../../../interfaces/interface";

const route = useRoute();
const router = useRouter();

const localCourseValue = ref<courseInterface>({
  id: parseInt(route.params.id as string, 10),
  name: '',
  description: '',
  img: '',
  questions: [],
  teacherId: "",
});

// Load courses from local storage on component mount
onMounted(() => {
  const storedCoursesJson = localStorage.getItem("courses");
  if (storedCoursesJson) {
    const storedCourses: courseInterface[] = JSON.parse(storedCoursesJson);
    const course = storedCourses.find(course => course.id === localCourseValue.value.id);
    if (course) {
      localCourseValue.value = course;
    }
  }
});

const storedQuestions = ref<Question[]>([]);

onMounted(() => {
  const storedQuestionsJson = localStorage.getItem("questions");
  if (storedQuestionsJson) {
    storedQuestions.value = JSON.parse(storedQuestionsJson);
  }
});
const saveError = ref<string>("");
const isSaveDisabled = computed(() => {
  const hasUnfilledFields = localCourseValue.value.questions.some(question => {
    return (
      question.question.trim() === '' ||
      question.options.length < 2 ||
      question.options.some(option => option.trim() === '') ||
      question.correctAnswer.trim() === ''
    );
  });

  if (hasUnfilledFields) {
    saveError.value =
      "Please fill all questions, options, and correct answers before saving.";
  } else {
    saveError.value = '';
  }

  return hasUnfilledFields;
});

function removeStoredQuestion(index: number): void {
  storedQuestions.value.splice(index, 1);
  localStorage.setItem('questions', JSON.stringify(storedQuestions.value));
}
function backtoDashboard() {
  router.push("/dashboard/teacher/courses");
}
function removeLocalQuestion(index: number): void {
  localCourseValue.value.questions.splice(index, 1);
  const storedCoursesJson = localStorage.getItem('courses');
  if (storedCoursesJson) {
    const storedCourses: courseInterface[] = JSON.parse(storedCoursesJson);
    const indexToRemove = storedCourses.findIndex(course => course.id === localCourseValue.value.id);
    if (indexToRemove !== -1) {
      storedCourses[indexToRemove].questions.splice(index, 1);
      localStorage.setItem("courses", JSON.stringify(storedCourses));
    }
  }
}
function addQuestion(): void {
  const newQuestion: Question = {
    question: "",
    options: [],
    correctAnswer: "",
  };
  localCourseValue.value.questions.push(newQuestion);
}

function addOption(questionIndex: number): void {
  const question = localCourseValue.value.questions[questionIndex];
  const existingOptions = new Set(question.options.map(option => option.trim().toLowerCase()));
  if (question.options.length < 5) {
    const newOption = prompt('Enter new option:');
    if (newOption !== null && newOption.trim() !== '') {
      const lowerCaseNewOption = newOption.trim().toLowerCase();
      if (existingOptions.has(lowerCaseNewOption)) {
        window.alert('Option already exists. Please enter a different option.');
      } else {
        question.options.push(newOption.trim());
      }
    }
  } else {
    window.alert('Maximum options limit reached. You cannot add more options.');
  }
}

function removeOption(questionIndex: number, optionIndex: number): void {
  const question = localCourseValue.value.questions[questionIndex];
  if (question.options.length > 2) {
    question.options.splice(optionIndex, 1);
  } else {
    window.alert('Minimum options limit reached. You cannot remove more options.');
  }
}

function updateQuestion(event: Event, qIndex: number): void {
  const target = event.target as HTMLInputElement;
  localCourseValue.value.questions[qIndex].question = target.value;
}
function updateOption(event: Event, qIndex: number, oIndex: number): void {
  const target = event.target as HTMLInputElement;
  const newOption = target.value.trim();
  const question = localCourseValue.value.questions[qIndex];
  const blurHandler = () => {
    const otherOptions = question.options.filter(
      (_, index) => index !== oIndex
    );
    if (
      otherOptions.some(
        (option) => option.trim().toLowerCase() === newOption.toLowerCase()
      )
    ) {
      window.alert("Option already exists. Please enter a different option.");
      target.focus();
    }
    target.removeEventListener("blur", blurHandler);
  };
  target.addEventListener("blur", blurHandler);
  question.options[oIndex] = newOption;
}

function updateCorrectAnswer(event: Event, qIndex: number): void {
  const target = event.target as HTMLSelectElement;
  localCourseValue.value.questions[qIndex].correctAnswer = target.value;
}

function saveCourse(): void {
  const invalidQuestion = localCourseValue.value.questions.find((question) => {
    return (
      question.options.length < 2 ||
      question.options.some((option) => option.trim() === "")
    );
  });

  if (invalidQuestion) {
    window.alert(
      "Please fill at least two options for each question before saving."
    );
    return;
  }
  const storedCoursesJson = localStorage.getItem("courses");
  if (storedCoursesJson) {
    const storedCourses: courseInterface[] = JSON.parse(storedCoursesJson);
    const index = storedCourses.findIndex(course => course.id === localCourseValue.value.id);
    if (index !== -1) {
      storedCourses[index] = localCourseValue.value;
      localStorage.setItem("courses", JSON.stringify(storedCourses));
    }
  }
  router.push({ name: "teacher-dashboard" });
}
</script>

<style scoped>
.show-questions {
  margin: 30px 20px 2px 20px;
}

.show-questions h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.question {
  font-size: larger;
  font-weight: bolder;
}

.question-section {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.question-section h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.question-section p {
  margin-bottom: 10px;
  color: #555;
}

.answers-list {
  list-style-type: none;
  padding: 0;
}

.answers-list li {
  margin-bottom: 8px;
  color: #666;
}

.correct-answer {
  color: #2ecc71;
  font-weight: bold;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  margin-left: 15px;

}

.question-area {
  height: 100%;
  width: 100%;
}

@media only screen and (min-width: 992px) {
  .question-area {
    width: 60%;
  }
}

.option-input {
  display: flex;
  align-items: center;
}

.option-input input {
  width: calc(100% - 30px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.option-input button {
  border: none;
  background: red;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.remove-button svg {
  width: 16px;
  height: 20px;
}


.back-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-course {
  position: relative;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-header {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.question-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.answers-section {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #eee;
}

.answer-section {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
select {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
  background-color: #3b5998;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

.save-button {
  background-color: #2ecc71;
  color: white;
}

button:hover {
  opacity: 0.8;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
