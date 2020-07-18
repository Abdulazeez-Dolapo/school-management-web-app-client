<template>
  <v-row class="ma-0 justify-center">
    <v-col class="pa-0" cols="12" sm="8" md="6">
      <v-card class="pb-0">
        <v-row class="pa-2 ma-0 justify-start">
          <p
            class="title black--text ma-0 font-weight-medium text-truncate text-capitalize"
          >
            {{ course.title }}
          </p>
        </v-row>

        <v-row class="pa-2 ma-0 justify-start">
          <p class="body-2 pa-0 ma-0">
            Description:
            <span class="font-weight-bold">{{ course.description }}</span>
          </p>
        </v-row>

        <v-row class="pa-2 ma-0 justify-start">
          <p class="body-2 pa-0 ma-0">
            Creator:
            <span class="font-weight-bold">{{ course.creator.name }}</span>
          </p>
        </v-row>

        <v-row class="pa-2 ma-0 justify-start">
          <p class="body-2 pa-0 ma-0">
            <span>
              Price:
            </span>
            <span class="font-weight-bold">{{
              course.price == 0 ? "Free" : `$${course.price}`
            }}</span>
          </p>
        </v-row>

        <v-row
          class="pa-2 ma-0 justify-start"
          v-if="$auth.$state.loggedIn && $auth.$state.user.role == 'Student'"
        >
          <v-btn
            v-if="!registered"
            depressed
            color="primary"
            @click="registerForCourse"
          >
            Register
          </v-btn>

          <v-btn v-else depressed color="error" @click="cancelRegistration">
            Cancel Registration
          </v-btn>
        </v-row>
      </v-card>
    </v-col>

    <notification
      @close="close"
      :dialog="notificationDialog"
      :text="notificationText"
    />
    <loading :dialog="loadingDialog" :text="loadingText" />
  </v-row>
</template>

<script>
import notification from "~/components/Notification";
import loading from "~/components/Loading";
import { handler } from "~/mixins/handler";

export default {
  mounted() {
    this.courses = JSON.parse(localStorage.getItem("courses")) || [];
  },
  components: {
    notification,
    loading
  },
  async asyncData({ $axios, params }) {
    try {
      const { course } = await $axios.$get(
        `/api/course/get-course/${params.courseId}`
      );
      return {
        course
      };
    } catch (error) {
      console.log(error.response);
    }
  },
  mixins: [handler],
  data: () => ({
    timer: "",
    courses: []
  }),
  computed: {
    registered() {
      const coursesIdArray = this.courses.map(course => course.courseId._id);
      if (coursesIdArray.includes(this.$route.params.courseId)) return true;
      return false;
    }
  },
  methods: {
    async registerForCourse() {
      try {
        clearTimeout(this.timer);
        this.loadingDialog = true;
        this.loadingText = "Registering for course";
        const payload = {
          userId: this.$auth.$state.user._id,
          courseId: this.$route.params.courseId
        };

        const { message, registeredCourse } = await this.$axios.$post(
          `/api/course/registration/register`,
          payload
        );
        const course = {
          courseId: this.course,
          userId: this.$auth.$state.user._id,
          _id: registeredCourse._id
        };

        this.courses.push(course);
        localStorage.setItem("courses", JSON.stringify(this.courses));

        this.notificationDialog = true;
        this.notificationText = message;
        this.loadingDialog = false;
        this.loadingText = "";
        this.timer = setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        console.log(error.response);
        this.handleError(error);
      }
    },
    async cancelRegistration() {
      try {
        clearTimeout(this.timer);
        this.loadingDialog = true;
        this.loadingText = "Canceling course registration";

        const registrationId = this.courses.find(
          course => course.courseId._id == this.$route.params.courseId
        );
        const { message } = await this.$axios.$delete(
          `/api/course/registration/cancel/${registrationId._id}`
        );

        // Remove registration id from the list of registered courses
        const courses = this.courses.filter(
          course => course._id !== registrationId._id
        );
        this.courses = courses;
        localStorage.setItem("courses", JSON.stringify(courses));

        this.notificationDialog = true;
        this.notificationText = message;
        this.loadingDialog = false;
        this.loadingText = "";
        this.timer = setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        this.handleError(error);
      }
    },
    close() {
      clearTimeout(this.timer);
      this.notificationDialog = false;
      this.notificationText = "";
    }
  }
};
</script>

<style></style>
