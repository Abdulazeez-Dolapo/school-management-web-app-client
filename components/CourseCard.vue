<template>
  <v-card @click="viewCourse(course._id)" class="pb-0">
    <v-row class="pa-2 ma-0 justify-start">
      <p
        class="title black--text ma-0 font-weight-medium text-truncate text-capitalize"
      >
        {{ course.title }}
      </p>
    </v-row>

    <v-row class="pa-2 ma-0 justify-start">
      <p class="body-2 pa-0 ma-0">
        Creator: <span class="font-weight-bold">{{ course.creator.name }}</span>
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
  </v-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewCourse(id) {
      this.$router.push(`/course/${id}`);
    }
  }
};
</script>
