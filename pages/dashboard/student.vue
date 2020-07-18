<template>
  <div>
    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 text-h3 pb-2 font-weight-bold">
        Welcome {{ userDetails.name }}
      </p>
    </v-row>

    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 pb-2">
        Here are a list of courses you registered for
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
  middleware: "auth",
  mounted() {
    this.courses = JSON.parse(localStorage.getItem("courses"));
    this.userDetails = this.$auth.$state.user;
  },
  data: () => ({
    courses: [],
    userDetails: {}
  })
};
</script>
