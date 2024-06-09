<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Course</h2>
      <label for="courseName">Course Title:</label>
      <input type="text" id="courseName" v-model="editedCourse!.name" />
      <div class="error-msg">
        <span>{{ errorMessages.title }}</span>
      </div>

      <label for="courseDescription">Course Description:</label>
      <textarea id="courseDescription" v-model="editedCourse!.description"></textarea>
      <div class="error-msg">
        <span>{{ errorMessages.description }}</span>
      </div>

      <label for="courseImage">Course Image:</label>
      <input type="file" id="courseImage" @change="onImageSelected" />
      <div class="error-msg">
        <span>{{ errorMessages.image }}</span>
      </div>
      <img :src="imagePreview" alt="Course Image" class="course-image-preview" v-if="imagePreview" />

      <button @click="saveChanges">Save Changes</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { courseInterface } from "../../../../interfaces/interface";

const props = defineProps<{
  isOpen: boolean;
  course: courseInterface | null;
}>();
const emit = defineEmits(["close", "save", "updateCourseList"]);
const errorMessages = ref({
  title: "",
  description: "",
  image: "",
});
const editedCourse = ref<courseInterface | null>(null);
const imagePreview = ref<string | null>(null);

watch(
  () => props.course,
  (newCourse) => {
    if (newCourse) {
      editedCourse.value = { ...newCourse };
      imagePreview.value = newCourse.img || null;
    }
  },
  { immediate: true }
);

const closeModal = () => {
  if (props.course) {
    editedCourse.value = { ...props.course };
    imagePreview.value = props.course.img || null;
  }
  emit("close");
};

const onImageSelected = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 100 * 1024) {
      errorMessages.value.image = "File size should not exceed 100KB";
    } else {
      errorMessages.value.image = "";
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = reader.result as string;
        if (editedCourse.value !== null && editedCourse.value !== undefined) {
          editedCourse.value.img = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
};

const saveChanges = () => {
  if (editedCourse.value) {
    let isValid = true;
    if (!editedCourse.value.name.trim()) {
      errorMessages.value.title = "Title can't be empty";
      isValid = false;
    } else if (
      editedCourse.value.name.trim().length < 3 ||
      editedCourse.value.name.trim().length > 20
    ) {
      errorMessages.value.title =
        "Title length should be between 3 and 20 only";
      isValid = false;
    } else {
      errorMessages.value.title = "";
    }

    if (!editedCourse.value.description.trim()) {
      errorMessages.value.description = "Description can't be empty";
      isValid = false;
    } else if (
      editedCourse.value.description.trim().length < 5 ||
      editedCourse.value.description.trim().length > 150
    ) {
      errorMessages.value.description =
        "Description length should be between 5 and 150 only";
      isValid = false;
    } else {
      errorMessages.value.description = "";
    }

    if (!editedCourse.value.img) {
      errorMessages.value.image = "Please choose an image";
      isValid = false;
    }
    if (isValid) {
      emit("save", {
        courseId: editedCourse.value.id,
        updatedCourse: editedCourse.value,
      });
      updateCourseInLocalStorage(editedCourse.value);
    }
  }
};

const updateCourseInLocalStorage = (updatedCourse: courseInterface) => {
  let courses = JSON.parse(localStorage.getItem("courses") || "[]");
  const index = courses.findIndex(
    (course: courseInterface) => course.id === updatedCourse.id
  );
  if (index !== -1) {
    courses[index] = updatedCourse;
    localStorage.setItem("courses", JSON.stringify(courses));
    emit("updateCourseList", courses);
    emit("close");
  }
};
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

input[type="text"],
input[type="file"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  height: 100px;
}

.course-image-preview {
  width: 70%;
  max-height: 130px;
  object-fit: contain;
  border-radius: 5px;
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
