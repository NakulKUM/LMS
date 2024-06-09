<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { User } from "../registration/Registration.vue";
const router = useRouter();
let email = ref("");
let password = ref("");
let error = ref("");

const forgotPassword = () => router.push("/forgotPassword");

function validateUser() {
  let users = localStorage.getItem("userData");
  const userData = users ? JSON.parse(users) : [];
  if (userData.length !== 0) {
    userData.forEach((element: User) => {
      if (email.value === "" && password.value === "") {
        error.value = "Please enter your credentials.";
      } else if (email.value === "") {
        error.value = "Please enter your email.";
      } else if (password.value === "") {
        error.value = "Please enter your password.";
      } else if (
        email.value !== element.email ||
        password.value !== element.password
      ) {
        error.value = "No user found please register first.";
      } else if (
        email.value === element.email &&
        element.role === "Teacher" &&
        password.value === element.password
      ) {
        localStorage.setItem("activeUser", element.id.toString());
        router.push("/dashboard/teacher/courses");
      } else if (
        email.value === element.email &&
        element.role === "Student" &&
        password.value === element.password &&
        (element.dob === null || element.dob === undefined)
      ) {
        localStorage.setItem("activeUser", element.id.toString());
        router.push("/dashboard/changePassword");
      } else if (
        email.value === element.email &&
        element.role === "Student" &&
        password.value === element.password
      ) {
        localStorage.setItem("activeUser", element.id.toString());
        router.push("/dashboard/student");
      }
    });
  } else {
    error.value =
      "Congratulations! you are first user on our platform please register first.";
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="container active" id="container">
      <form id="login-form">
        <p class="text-center text-red-600 text-s">{{ error }}</p>
        <h1>Login</h1>
        <div class="form-group">
          <input
            v-model="email"
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <span class="error" id="emailError"></span>
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <span class="error" id="passwordError"></span>
        </div>
        <div class="uiButtons">
          <button @click.prevent="validateUser">Login</button>
          <p @click="forgotPassword">Forgot password?</p>
        </div>
      </form>
    </div>
    <div class="redirect">
      <p class="or">OR</p>
      <p>
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #3b5998;
  padding: 15px;
  font-size: 30px;
  font-weight: 700;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.container {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  width: 400px;
  height: 350px;
  border-radius: 25px;
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
.uiButtons p:hover {
  text-decoration: underline;
}
button {
  background-color: #3b5998;
  width: 100%;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}
.container button.hidden {
  background-color: transparent;
  border-color: #fff;
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
}
.form-group input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}
span {
  color: red;
  display: block;
}
span.notred {
  color: black;
}
.redirect {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5px;
}
.redirect p {
  color: black;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
  font-weight: 500;
}
.redirect p a {
  color: #3b5998;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
.redirect p a:hover {
  text-decoration: underline;
}
.redirect .or {
  font-size: 20px;
  color: #3b5998;
  font-weight: 500;
}
@media screen and (max-width: 480px) {
  .container {
    width: 300px;
  }
  .redirect p {
    font-size: 15px;
  }
}
</style>
