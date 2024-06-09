<template>
  <div class="h-screen w-screen">
    <Header :headerOpen="false" />
    <div class="h-[92vh] w-screen bg-white flex">
      <div
        class="h-[35px] absolute w-[80px] flex justify-center items-center cursor-pointer text-white bg-[#3b5998] rounded-md gap-[5px] p-[11px] m-[20px] hover:bg-[#32446b]"
        @click="backtoDashboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path
            d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
          />
        </svg>
        Back
      </div>
      <div
        class="h-full w-full flex items-center justify-center bg-white md:flex-col sm:flex-col"
      >
        <div
          class="h-[70%] w-[40%] flex flex-col text-[#325998] justify-start items-start sm:w-[30%]"
        >
          <div
            class="h-[80%] w-[95%] flex items-center justify-center flex-col sm:h-full gap-3 sm:gap-0 sm:mt-10"
          >
            <div class="h-full w-[70%]">
              <img
                class="h-[300px] w-[300px] rounded-full md:h-[200px] md:w-[200px] sm:h-[90px] sm:w-[100px] border-2"
                :src="image"
                alt=""
              />
            </div>
            <div class="text-3xl sm:text-2xl sm:w-44 font-bold sm:font-medium h-full w-[55%]">
              <h1>Hey {{ shortName }} !</h1>
            </div>
          </div>
        </div>
        <div
          class="h-[90%] w-[40%] flex flex-col items-start justify-start sm:h-[100%] sm:w-[100%] sm:items-center"
        >
          <div
            class="h-[80%] w-[95%] flex items-center justify-center gap-[20px] flex-col sm:w-[100%] sm:justify-center"
          >
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center rounded-md bg-[#3b5998]"
            >
              <h4 class="text-[22px] text-white ml-2 tracking-wide">
                Full Name:
              </h4>
              <p
                class="tracking-wide text-[18px] text-grey-900 text-green-500 font-medium"
              >
                {{ fullName }}
              </p>
            </div>
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center bg-[#3b5998] rounded-md"
            >
              <h4 class="text-[22px] text-white ml-2 tracking-wide">Email:</h4>
              <p class="tracking-wide text-[16px] text-orange-300 font-medium">
                {{ email }}
              </p>
            </div>
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center bg-[#3b5998] rounded-md"
            >
              <h4 class="text-[22px] text-white ml-2 tracking-wide">
                Date of birth:
              </h4>
              <p class="tracking-wide text-[16px] text-orange-300 font-medium">
                {{ dob }}
              </p>
            </div>
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center bg-[#3b5998] rounded-md"
            >
              <h4 class="text-[22px] text-white tracking-wide ml-2">
                Contact Number:
              </h4>
              <p class="tracking-wide text-[16px] text-orange-300 font-medium">
                {{ contact }}
              </p>
            </div>
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center bg-[#3b5998] rounded-md"
            >
              <h4 class="text-[22px] text-white tracking-wide ml-2">Gender:</h4>
              <p class="tracking-wide text-[16px] text-orange-300 font-medium">
                {{ gender }}
              </p>
            </div>
            <div
              class="w-full flex items-center justify-start gap-[10px] sm:justify-center bg-[#3b5998] rounded-md"
            >
              <h4 class="text-[22px] text-white tracking-wide ml-2">
                Designation:
              </h4>
              <p class="tracking-wide text-[16px] text-green-500 font-medium">
                {{ role }}
              </p>
            </div>
            <div
              class="w-[100%] flex items-start justify-start cursor-pointer text-white rounded-[6px] gap-[4px]"
            >
              <div
                class="w-[140px] flex text-[15px] items-center justify-center cursor-pointer text-white bg-[#3b5998] gap-[5px] p-[8px] rounded-[6px] hover:bg-[#32446b] sm:ml-2"
                @click="editProfile"
              >
                Edit Details
                <svg
                  class="w-[17px] h-[20px]"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path
                    d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                  />
                </svg>
              </div>
              <div
                class="w-[200px] flex text-[15px] items-center justify-center cursor-pointer text-white bg-green-700 gap-[5px] p-[8px] rounded-[6px] hover:bg-green-900"
                @click="changePassword"
              >
                Change Password
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#FFFFFF"
                >
                  <path
                    d="M280-408q-29.67 0-50.83-21.17Q208-450.33 208-480q0-29.67 21.17-50.83Q250.33-552 280-552q29.67 0 50.83 21.17Q352-509.67 352-480q0 29.67-21.17 50.83Q309.67-408 280-408Zm0 168q-100 0-170-70T40-480q0-100 70-170t170-70q70.33 0 124.5 33.67 54.17 33.66 85.5 97.66h354.67L960-473.33l-171.33 162L703.33-374 618-311.33l-78.33-60H490q-27.33 58-81.17 94.66Q355-240 280-240Zm0-66.67q57.33 0 104.17-37Q431-380.67 445-438h117.67L618-394.33l86-62.34L782.33-397 864-474.67 816.67-522H445q-12.67-54.67-58.83-93Q340-653.33 280-653.33q-72 0-122.67 50.66Q106.67-552 106.67-480t50.66 122.67Q208-306.67 280-306.67Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "../../components/Header.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const image = ref("");
const shortName = ref("");
const fullName = ref("");
const email = ref("");
const dob = ref("");
const contact = ref("");
const gender = ref("");
const role = ref("");
let userRole: string = "";
const activeUserId = localStorage.getItem("activeUser");
if (
  activeUserId !== null ||
  activeUserId !== "" ||
  activeUserId !== undefined
) {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  userData.forEach((element: any) => {
    if (Number(activeUserId) === element.id) {
      fullName.value = element.name;
      shortName.value = element.name.split(" ")[0];
      email.value = element.email;
      dob.value = element.dob;
      contact.value = element.contactNumber;
      gender.value = element.gender;
      role.value = element.role;
      userRole = element.role;
      image.value = element.photo;
    }
  });
} else {
  router.push("/");
}

function backtoDashboard() {
  if (userRole === "Teacher") {
    router.push("/dashboard/teacher/courses");
  } else {
    router.push("/dashboard/student");
  }
}

function editProfile() {
  router.push("/profile/edit");
}

function changePassword() {
  router.push("/dashboard/changePassword");
}
</script>

<!-- <style scoped>

@media screen and (max-width: 800px) {
  .profile-image {
    width: 70%;
    height: 60%;
  }
  .profile-image img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
  }
  .profile-right-contents {
    width: 70%;
    height: 60%;
  }
  .profile-right {
    width: 70%;
    height: 60%;
  }
  .profile-right-editbutton {
    height: 30%;
  }
  .edit-button {
    height: 100%;
    width: 100px;
    font-size: 10px;
  }
  .profile-content {
    display: flex;
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 450px) {
  .profile-section-wrapper {
    min-height: 100vh;
    width: 100vw;
  }
  .profile-main-body {
    min-height: 92vh;
    width: 100vw;
    overflow: scroll;
  }
  .profile-left-contents {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .profile-image {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-image img {
    border-radius: 50%;
    height: 120px;
    width: 120px;
  }
  .profile-left h1 {
    font-size: 25px;
  }
  .profile-left {
    height: 100%;
    width: 100%;
    margin-bottom: 40px;
    margin-top: 10px;
  }
  .profile-right-contents {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .profile-right {
    width: 100%;
    height: 100%;
  }
  .profile-right-editbutton {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .details {
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    gap: 20px;
  }
  .details p {
    word-break: break-all;
  }
  .edit-button {
    height: 30px;
    width: 100px;
    font-size: 10px;
  }
  .profile-content {
    flex-direction: column;
    height: 100vh;
  }
}
</style>  -->
