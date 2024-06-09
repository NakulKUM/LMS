<template>
  <div
    class="border-[1px] w-[500px] p-[20px] rounded-3xl border-gray-200 shadow-lg"
  >
    <h1
      class="text-[40px] mb-5 font-medium bg-[#3b5998] text-white pl-2 rounded-xl"
    >
      Edit Details:
    </h1>
    <div class="mb-2">
      <label for="profile" class="block mb-2 text-sm font-medium"
        >Update Photo</label
      >
      <input
        type="file"
        id="profile"
        class="text-sm rounded-lg w-full p-2.5"
        @change="handleFileChange"
        required
      />
      <span class="error text-red-500 text-sm">{{ imageError }}</span>
    </div>
    <div class="mb-2">
      <label for="fullname" class="block mb-2 text-sm font-medium"
        >Fullname</label
      >
      <input
        v-model="fullName"
        type="text"
        id="fullname"
        @focusout="validateName"
        class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
        required
      />
      <span class="error text-red-500 text-sm">{{ nameError }}</span>
    </div>
    <div class="mb-2">
      <label for="email" class="block mb-2 text-sm font-medium">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        @focusout="validateEmail"
        class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
        required
      />
      <span class="error text-red-500 text-sm">{{ emailError }}</span>
    </div>
    <div class="mb-2">
      <label for="dob" class="block mb-2 text-sm font-medium"
        >Date of birth</label
      >
      <input
        v-model="dob"
        type="date"
        id="dob"
        @focusout="validateDOB"
        class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
        required
      />
      <span class="error text-red-500 text-sm">{{ dobError }}</span>
    </div>
    <div class="mb-2">
      <label for="contact" class="block mb-2 text-sm font-medium"
        >Contact number</label
      >
      <input
        v-model="contact"
        type="number"
        id="contact"
        @focusout="validateContactNumber"
        class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600"
        required
      />
      <span class="error text-red-500 text-sm">{{ contactNumberError }}</span>
    </div>
    <div class="mb-2">
      <label class="block mb-2 text-sm font-medium">Gender</label>
      <div class="flex gap-2">
        <div class="flex items-center gap-2">
          <input
            v-model="gender"
            type="radio"
            name="gender"
            value="Male"
            @focusout="validateGender"
            class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label class="text-xs font-medium">Male</label>
        </div>
        <div class="flex items-center gap-2">
          <input
            v-model="gender"
            type="radio"
            name="gender"
            value="Female"
            @focusout="validateGender"
            class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label class="text-xs font-medium">Female</label>
        </div>
        <div class="flex items-center gap-2">
          <input
            v-model="gender"
            type="radio"
            name="gender"
            value="Other"
            @focusout="validateGender"
            class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label class="text-xs font-medium">Other</label>
        </div>
      </div>
      <span class="error text-red-500 text-sm">{{ genderError }}</span>
    </div>
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:w-32 sm:text-xs"
      @click="saveChanges"
    >
      Save Changes
    </button>
    <button
      type="button"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3 sm:text-xs"
      @click="resetData"
    >
      Clear
    </button>
    <button
      type="button"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3 sm:text-xs"
      @click="redirect"
      v-if="!disable"
    >
      Back
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();

const fullName = ref("");
const email = ref("");
const dob = ref("");
const contact = ref("");
const gender = ref("");
const photo = ref<string | null>(null);

const nameError = ref("");
const emailError = ref("");
const dobError = ref("");
const contactNumberError = ref("");
const genderError = ref("");
const imageError = ref("");

const activeUserId = localStorage.getItem("activeUser");

const userData = JSON.parse(localStorage.getItem("userData")!);
if (
  activeUserId !== null ||
  activeUserId !== "" ||
  activeUserId !== undefined
) {
  userData.forEach((element: any) => {
    if (Number(activeUserId) === element.id) {
      fullName.value = element.name;
      email.value = element.email;
      dob.value = element.dob;
      contact.value = element.contactNumber;
      gender.value = element.gender;
      photo.value = element.photo;
    }
  });
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        photo.value = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

function validateImage() {
  if (photo.value) {
    if (photo.value.length > 2000000) {
      imageError.value = "Image size should be less than 2 mb";
    } else {
      imageError.value = "";
    }
  }
}

function validateName() {
  const regex = /[a-zA-Z\s]{5,}$/;
  if (fullName.value === "") {
    nameError.value = "Please enter your name.";
  } else if (!regex.test(fullName.value)) {
    nameError.value =
      "Full name should be at least 6 characters long, and only contain alphabets";
  } else {
    nameError.value = "";
  }
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "") {
    emailError.value = "Please enter your email address";
  } else if (!regex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
  } else {
    emailError.value = "";
  }
}

function validateDOB() {
  let birthYear = new Date(dob.value).getFullYear();
  let currentYear = new Date().getFullYear();
  if (Number.isNaN(birthYear)) {
    dobError.value = "Please enter your date of birth";
  } else {
    if (currentYear - birthYear > 75 || currentYear - birthYear < 18) {
      dobError.value = "Age should be between 18 and 75";
    } else {
      dobError.value = "";
    }
  }
}
function validateContactNumber() {
  const regex = /^\d{10}$/;
  if (contact.value === "") {
    contactNumberError.value = "Please enter your contact number";
  } else if (!regex.test(contact.value)) {
    contactNumberError.value = "Not a valid contact number";
  } else {
    contactNumberError.value = "";
  }
}

function validateGender() {
  if (!gender.value) {
    genderError.value = "Please select your gender";
  } else {
    genderError.value = "";
  }
}

function saveChanges() {
  validateImage();
  validateName();
  validateEmail();
  validateDOB();
  validateContactNumber();
  validateGender();
  if (
    !imageError.value &&
    !nameError.value &&
    !emailError.value &&
    !dobError.value &&
    !contactNumberError.value &&
    !genderError.value
  ) {
    userData.forEach((element: any) => {
      if (Number(activeUserId) === element.id) {
        element.name = fullName.value;
        element.email = email.value;
        element.dob = dob.value;
        element.contactNumber = contact.value;
        element.gender = gender.value;
        element.photo = photo.value;
      }
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/dashboard/teacher/profile");
  }
}

function resetData() {
  window.location.reload();
}
const disable = ref(false);

onMounted(() => {
  userData.forEach((element: any) => {
    if (Number(activeUserId) === element.id) {
      if (element.dob === null || element.dob === undefined) {
        disable.value = true;
      }
    }
  });
});

function redirect() {
  router.push("/dashboard/teacher/profile");
}
</script>
