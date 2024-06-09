<template>
  <div class="row">
    <h1>Forgot Password</h1>
    <h6 class="information-text">
      Enter your registered email to reset your password.
    </h6>
    <div class="form-group">
      <input type="email" name="user_email" id="user_email" />
      <p><label for="username">Email</label></p>
      <button onclick="">Reset Password</button>
    </div>
    <div class="footer">
      <h5>New here? <RouterLink to="/register"> Sign Up.</RouterLink></h5>
      <h5>
        Already have an account? <RouterLink to="/"> Sign In.</RouterLink>
      </h5>
      <p class="information-text">
        Made with<span class="symbols" title="Lots of love from me to YOU!"
          >&hearts;
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
@import url("../../assets/style.css");
</style>
