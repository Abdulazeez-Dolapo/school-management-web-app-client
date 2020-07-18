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

        <v-row class="pa-2 ma-0 justify-start">
          <v-btn depressed color="primary">
            Register
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import notification from "~/components/Notification";
import loading from "~/components/Loading";
import { handler } from "../mixins/handler";

export default {
  async asyncData({ $axios, params }) {
    try {
      const { course } = await $axios.$get(
        `/api/course/get-course/${params.courseId}`
      );
      console.log(course);
      return {
        course
      };
    } catch (error) {
      console.log(error.response);
    }
  },
  mixins: [handler]
};
</script>

<style></style>
