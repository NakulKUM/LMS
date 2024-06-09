<template>
  <div class="topbar">
    <img
      src="../assets/burger-list-menu-navigation-svgrepo-com.svg"
      alt=""
      class="hidden sm:block cursor-pointer"
      @click="toggleSidebar"
    />
    <div class="container">
      <div class="logo sm:text-xs">Learning Management System</div>
      <div class="profile sm:" v-if="headerOpen">
        <div class="list-header" v-if="isProfileMenuOpen">
          <div class="list-item" @click="openProfile">
            Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
              />
            </svg>
          </div>
          <div class="list-item" @click="logout">
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
              />
            </svg>
          </div>
        </div>
        <div class="profile-div" @click="toggleProfileMenu">
          <img :src="image" alt="" />
          <div class="name">{{ name }}</div>
        </div>
      </div>
      <div class="logout" v-else @click="logout">
        Logout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
let isProfileMenuOpen = ref(false);
let name = ref("");
const image = ref("");

const emit = defineEmits(["toggleSidebar"]);

function toggleSidebar() {
  emit("toggleSidebar");
}

defineProps({
  headerOpen: {
    type: Boolean,
  },
});

const activeUserId = localStorage.getItem("activeUser");
if (
  activeUserId !== null ||
  activeUserId !== "" ||
  activeUserId !== undefined
) {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  userData.forEach((element: any) => {
    if (Number(activeUserId) === element.id) {
      name.value = element.name.split(" ")[0];
      image.value = element.photo;
    }
  });
}

const router = useRouter();
function logout() {
  localStorage.removeItem("activeUser");
  router.push("/");
}

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
}

function openProfile() {
  router.push("/dashboard/teacher/profile");
}
</script>

<style scoped>
.topbar {
  height: 8vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b5998;
}
.container {
  height: 100%;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 20px;
  color: #ffffff;
}
.list-header {
  height: 100px;
  width: 150px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  right: 35px;
  top: 52px;
  box-shadow: 1px 3px 10px -5px rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 10px;
}
.list-item {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3b5998;
  background-color: white;
  border-radius: 10px;
  gap: 5px;
  font-weight: 500;
}
.list-item:hover {
  background-color: #87a5e6c4;
  color: white;
  font-weight: 600;
}
.profile-div {
  height: 45px;
  width: 150px;
  border-radius: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3b5998;
  background-color: white;
}
.logout {
  height: 35px;
  padding: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3b5998;
  background-color: white;
  border-radius: 6px;
  gap: 5px;
  font-size: 14px;
}
.logout svg {
  height: 18px;
  width: 20px;
  fill: #000000;
}
.logout:hover svg {
  fill: white;
}
.logout:hover {
  background-color: #87a5e6c4;
  color: white;
  font-weight: 600;
}
.profile-div:hover {
  background-color: #87a5e6c4;
  color: white;
}
img {
  border: 1px solid rgb(48, 80, 184);
  height: 100%;
  width: 30%;
  border-radius: 50%;
}
.name {
  height: 100%;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

@media screen and (max-width: 570px) {
  .logo {
    font-size: 14px;
  }
}
</style>
