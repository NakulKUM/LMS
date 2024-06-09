<template>
  <div class="cardStyle">
    <button class="closeButton" @click="redirect">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="30px"
        fill="#000000"
      >
        <path
          d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"
        />
      </svg>
    </button>
    <form action="" method="post" name="signupForm" id="signupForm">
      <img src="" id="signupLogo" />

      <h2 class="formTitle">Change Password</h2>

      <div class="inputDiv">
        <label class="inputLabel" for="password">New Password</label>
        <input
          type="password"
          v-model="newPass"
          @focusout="validatePassword"
          id="password"
          name="password"
          required
        />
        <span class="error text-red-500 text-sm">{{ passwordError }}</span>
      </div>

      <div class="inputDiv">
        <label class="inputLabel" for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPass"
          @focusout="validateConfirmPassword"
          id="confirmPassword"
          name="confirmPassword"
        />
        <span class="error text-red-500 text-sm">{{
          confirmPasswordError
        }}</span>
      </div>

      <div class="buttonWrapper">
        <button
          type="submit"
          id="submitButton"
          @click="saveChanges"
          class="submitButton pure-button pure-button-primary"
        >
          <span>Continue</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { User } from "../../views/registration/Registration.vue";
const router = useRouter();
const newPass = ref("");
const confirmPass = ref("");

const passwordError = ref("");
const confirmPasswordError = ref("");

let users = localStorage.getItem("userData");
const userData: User[] = users ? JSON.parse(users) : [];
const activeUserId = localStorage.getItem("activeUser");

function validatePassword() {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (newPass.value === "") {
    passwordError.value = "Please enter a password";
  } else if (!regex.test(newPass.value)) {
    passwordError.value =
      "Password should contain at least one uppercase letter, one special character, and be at least 8 characters long";
  } else {
    passwordError.value = "";
  }
}

function validateConfirmPassword() {
  if (newPass.value !== confirmPass.value) {
    confirmPasswordError.value = "Passwords do not match";
  } else {
    confirmPasswordError.value = "";
  }
}

function redirect() {
  userData.forEach((user: any) => {
    if (Number(activeUserId) === user.id) {
      if (user.dob === null || user.dob === undefined) {
        router.push("/");
      } else {
        router.push("/dashboard/teacher/profile");
      }
    }
  });
}

function saveChanges() {
  validatePassword();
  validateConfirmPassword();
  if (!passwordError.value && !confirmPasswordError.value) {
    userData.forEach((element: any) => {
      if (Number(activeUserId) === element.id) {
        element.password = newPass.value;
      }
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    router.push("/profile/edit");
  }
}
</script>

<style scoped>
.closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.cardStyle {
  width: 500px;
  border-color: white;
  background: #fff;
  padding: 36px 0;
  border-radius: 4px;
  margin: 30px 0;
  box-shadow: 0px 0 2px 0 rgba(0, 0, 0, 0.25);
  position: relative;
}
#signupLogo {
  max-height: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.formTitle {
  font-weight: 600;
  margin-top: 20px;
  color: #2f2d3b;
  text-align: center;
}
.inputLabel {
  font-size: 12px;
  color: #555;
  margin-bottom: 6px;
  margin-top: 24px;
}
.inputDiv {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
input {
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  border: solid 1px #ccc;
  padding: 0 11px;
}
input:disabled {
  cursor: not-allowed;
  border: solid 1px #eee;
}
.buttonWrapper {
  margin-top: 40px;
}
.submitButton {
  width: 70%;
  height: 40px;
  margin: auto;
  display: block;
  color: #fff;
  background-color: #065492;
  border-color: #065492;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.035);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.submitButton:disabled,
button[disabled] {
  border: 1px solid #cccccc;
  background-color: #cccccc;
  color: #666666;
}

#loader {
  position: absolute;
  z-index: 1;
  margin: -2px 0 0 10px;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #666666;
  width: 14px;
  height: 14px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
