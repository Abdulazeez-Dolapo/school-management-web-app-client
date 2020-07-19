<template>
  <div>
    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 text-h3 pb-2 font-weight-bold">
        Welcome {{ userDetails.name }}
      </p>
    </v-row>

    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 pb-2" v-if="courses.length > 0">
        Here are a list of courses you registered for
      </p>

      <p class="ma-0 pb-2" v-else>
        You have not registered for any courses. Please go back to the home page
        and register for one
      </p>
    </v-row>

    <v-row class="ma-0 justify-center justify-sm-start">
      <v-col
        class="pa-1"
        cols="12"
        sm="6"
        md="4"
        v-for="course in courses"
        :key="course._id"
      >
        <card :course="course" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import card from "~/components/CourseCard.vue";
export default {
  components: {
    card
  },
  middleware: ["auth", "student-guard"],
  mounted() {
    localStorage.setItem("courses", JSON.stringify(this.courses));
    this.userDetails = this.$auth.$state.user;
  },
  async asyncData({ $axios }) {
    const { courses } = await $axios.$get(
      `/api/course/registration/get-all-courses-registered`
    );
    return {
      courses
    };
  },
  data: () => ({
    userDetails: {}
  })
};
</script>
