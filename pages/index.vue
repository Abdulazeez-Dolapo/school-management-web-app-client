<template>
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
</template>

<script>
import card from "~/components/CourseCard.vue";
export default {
  components: {
    card
  },
  async asyncData({ $axios }) {
    try {
      const { courses } = await $axios.$get("/api/course/get-all-courses");
      return {
        courses
      };
    } catch (error) {
      console.log(error.response);
    }
  }
};
</script>
