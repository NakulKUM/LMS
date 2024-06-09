<template>
  <div class="dashboard-wrapper">
    <Header :headerOpen="true" @toggle-sidebar="toggleSidebar" />
    <div class="dash-board-main-body">
      <Sidebar :studentsButton="true" v-if="sidebarOpen" />
      <div class="content-area">
        <div class="addCourse">
          <div class="wrapper">
            <div class="container" id="container">
              <div @click="backToDashboard" class="close-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path
                    d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
                  />
                </svg>
              </div>
              <form id="add-course" @submit.prevent="addCourse">
                <h1>Add Course</h1>
                <div class="form-group">
                  <input
                    v-model="courseTitle"
                    type="text"
                    id="course"
                    name="course"
                    placeholder="Enter Course Title"
                  />
                </div>
                <div class="error-msg">
                  <span>{{ errorMessages.title }}</span>
                </div>

                <div class="form-group">
                  <textarea
                    v-model="courseDescription"
                    name="course-desc"
                    id="course-desc"
                    placeholder="Enter course description"
                  ></textarea>
                </div>
                <div class="error-msg">
                  <span>{{ errorMessages.description }}</span>
                </div>

                <div class="form-group">
                  <input
                    type="file"
                    id="course-logo"
                    @change="onFileChange"
                    name="course-logo"
                  />
                </div>
                <div class="error-msg">
                  <span>{{ errorMessages.image }}</span>
                </div>
                <div class="uiButtons">
                  <button type="submit">Add Course</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "../../../../components/Header.vue";
import Sidebar from "../../../../components/SideBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const sidebarOpen = ref(true);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

const router = useRouter();
const courseTitle = ref("");
const courseDescription = ref("");
const courseImage = ref<string | ArrayBuffer | null>();
const errorMessages = ref({
  title: "",
  description: "",
  image: "",
});

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.size > 100 * 1024) {
      errorMessages.value.image = "File size should not exceed 100KB";
    } else {
      errorMessages.value.image = "";
      const reader = new FileReader();
      reader.onload = (e) => {
        courseImage.value = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

function addCourse() {
  let isValid = true;
  if (!courseTitle.value.trim()) {
    errorMessages.value.title = "Title can't be empty";
    isValid = false;
  } else if (
    courseTitle.value.trim().length < 3 ||
    courseTitle.value.trim().length > 20
  ) {
    errorMessages.value.title = "Title length should be between 3 and 20 only";
    isValid = false;
  } else {
    errorMessages.value.title = "";
  }

  if (!courseDescription.value.trim()) {
    errorMessages.value.description = "Title can't be empty";
    isValid = false;
  } else if (
    courseDescription.value.trim().length < 5 ||
    courseDescription.value.length > 150
  ) {
    errorMessages.value.description =
      "Description length should be between 5 and 150 only";
    isValid = false;
  } else {
    errorMessages.value.description = "";
  }

  if (!courseImage.value) {
    errorMessages.value.image = "Please choose an image";
    isValid = false;
  }

  if (isValid) {
    const newCourse = {
      id: Date.now(),
      name: courseTitle.value,
      description: courseDescription.value,
      img: courseImage.value,
      teacherId: localStorage.getItem("activeUser"),
      questions: [],
    };

    let courses = JSON.parse(localStorage.getItem("courses") || "[]");
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));

    router.push("/dashboard/teacher/courses");
  }
}

function backToDashboard() {
  router.push("/dashboard/teacher/courses");
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

h1 {
  color: #3b5998;
  padding: 15px;
  margin-top: -2rem;
  font-size: 30px;
  font-weight: 700;
}

.addCourse {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

.container {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  width: 600px;
  height: 450px;
  border-radius: 25px;
  position: relative;
}

.uiButtons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.uiButtons p {
  font-size: 14px;
  color: #3b5998;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
}

button {
  background-color: #3b5998;
  width: 90%;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 1rem;
  cursor: pointer;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  border-radius: 15px;
}

.form-group {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}

.form-group input,
textarea {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 90%;
  outline: none;
}

.form-group svg {
  position: absolute;
  top: 1rem;
  right: 3.2rem;
}

.close-icon {
  position: absolute;
  left: 10px;
  top: 6px;
  cursor: pointer;
}

.close-icon:hover {
  color: #000;
}
.error-msg {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

@media screen and (max-width: 480px) {
  .container {
    width: 100%;
  }

  .container form {
    padding: 0;
  }

  .form-group svg {
    right: 1rem;
  }
}
</style>
