<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import defaultMale from "/src/assets/male.png";
import defaultFemale from "/src/assets/female.png";

const router = useRouter();

export interface User {
  id: number;
  photo: string;
  name: string;
  email: string;
  dob: string;
  contactNumber: string;
  password: string;
  gender: string;
  role: string;
}

let users = localStorage.getItem("userData");
const userData: User[] = users ? JSON.parse(users) : [];

const name = ref("");
const email = ref("");
const dob = ref("");
const contactNumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const gender = ref("");
let image;

const nameError = ref("");
const emailError = ref("");
const dobError = ref("");
const contactNumberError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const genderError = ref("");

function validateName() {
  const regex = /[a-zA-Z\s]{5,}$/;
  if (name.value === "") {
    nameError.value = "Please enter your name.";
  } else if (!regex.test(name.value)) {
    nameError.value =
      "Full name should be at least 6 characters long, and only contain alphabets";
  } else {
    nameError.value = "";
  }
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  userData.forEach((user) => {
    if (email.value === user.email) {
      emailError.value = "User already registered";
    } else if (email.value === "") {
      emailError.value = "Please enter your email address";
    } else if (!regex.test(email.value)) {
      emailError.value = "Please enter a valid email address";
    } else {
      emailError.value = "";
    }
  });
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
  if (contactNumber.value === "") {
    contactNumberError.value = "Please enter your contact number";
  } else if (!regex.test(contactNumber.value)) {
    contactNumberError.value = "Not a valid contact number";
  } else {
    contactNumberError.value = "";
  }
}

function validatePassword() {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (password.value === "") {
    passwordError.value = "Please enter a password";
  } else if (!regex.test(password.value)) {
    passwordError.value =
      "Password should contain at least one uppercase letter, one special character, and be at least 8 characters long";
  } else {
    passwordError.value = "";
  }
}

function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = "Passwords do not match";
  } else {
    confirmPasswordError.value = "";
  }
}

function validateGender() {
  if (!gender.value) {
    genderError.value = "Please select your gender";
  } else {
    genderError.value = "";
  }
}

function redirect(event: Event) {
  event.preventDefault();

  validateName();
  validateEmail();
  validateDOB();
  validateContactNumber();
  validatePassword();
  validateConfirmPassword();
  validateGender();

  if (gender.value === "Male") {
    image = defaultMale;
  } else {
    image = defaultFemale;
  }

  if (
    !nameError.value &&
    !emailError.value &&
    !dobError.value &&
    !contactNumberError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !genderError.value
  ) {
    userData.push({
      id: Date.now(),
      photo: image,
      name: name.value,
      email: email.value,
      dob: dob.value,
      contactNumber: contactNumber.value,
      password: password.value,
      gender: gender.value,
      role: "Teacher",
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registered Succesfully!");
    router.push("/");
  }
}
</script>

<template>
  <div class="shadow-lg w-[500px] max-h-[95%] bg-white rounded-2xl">
    <form
      id="signup-form"
      @submit="redirect"
      class="bg-white flex flex-col items-center justify-center p-10 h-full rounded-2xl"
    >
      <h1 class="text-3xl font-bold text-[#3b5998] py-3">Create Account</h1>
      <div class="form-group w-full">
        <input
          v-model="name"
          type="text"
          id="name"
          name="fullname"
          placeholder="Enter your name"
          @focusout="validateName"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{ nameError }}</span>
      </div>
      <div class="form-group w-full">
        <input
          v-model="email"
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          @focusout="validateEmail"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{ emailError }}</span>
      </div>
      <div class="form-group w-full">
        <input
          v-model="dob"
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter your Date of Birth"
          @focusout="validateDOB"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{ dobError }}</span>
      </div>
      <div class="form-group w-full">
        <input
          v-model="contactNumber"
          type="number"
          id="mobile"
          name="contactNumber"
          placeholder="Enter your contact number"
          @focusout="validateContactNumber"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{ contactNumberError }}</span>
      </div>
      <div class="form-group w-full">
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          @focusout="validatePassword"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{ passwordError }}</span>
      </div>
      <div class="form-group w-full">
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          @focusout="validateConfirmPassword"
          class="bg-gray-200 border-none my-2 p-3 text-sm rounded-md w-full outline-none"
        />
        <span class="error text-red-500 text-sm">{{
          confirmPasswordError
        }}</span>
      </div>
      <div class="form-group w-full">
        <label class="block mb-2">Gender:</label>
        <div class="flex gap-2">
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              v-model="gender"
              @focusout="validateGender"
              class="mr-1"
            />
            <label for="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              v-model="gender"
              @focusout="validateGender"
              class="mr-1"
            />
            <label for="female">Female</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              v-model="gender"
              @focusout="validateGender"
              class="mr-1"
            />
            <label for="other">Other</label>
          </div>
        </div>
        <span class="error text-red-500 text-sm">{{ genderError }}</span>
      </div>
      <button
        type="submit"
        class="text-white bg-[#3b5998] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 w-full uppercase"
      >
        Sign Up
      </button>
      <div class="redirect mt-4">
        <p class="text-black">
          Already have an account?
          <RouterLink to="/" class="text-[#3b5998] font-bold hover:underline"
            >Login Here</RouterLink
          >
        </p>
      </div>
    </form>
  </div>
</template>
