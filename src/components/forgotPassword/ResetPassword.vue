<style scoped>
@import url("./style.css");
</style>
<template>
  <div class="row">
    <h1>Reset Password</h1>

    <div class="form-group">
      <input type="email" name="user_email" id="user_email" />
      <p><label for="username">Password</label></p>
      <input type="email" name="user_email" id="user_email" />
      <p><label for="username">Confirm Password</label></p>
      <button onclick="">Submit</button>
    </div>
    <div class="footer">
      <h5>New here? <RouterLink to="/register"> Sign Up.</RouterLink></h5>
      <h5>
        Already have an account? <RouterLink to="/"> Sign In.</RouterLink>
      </h5>
      <p class="information-text">
        Made with
        <span class="symbols" title="Lots of love from me to YOU!"
          >&hearts;
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
