<template>
  <v-card @click="viewCourse(displayedCourse._id)" class="pb-0">
    <v-row class="pa-2 ma-0 justify-start">
      <p
        class="title black--text ma-0 font-weight-medium text-truncate text-capitalize"
      >
        {{ displayedCourse.title }}
      </p>
    </v-row>

    <v-row class="pa-2 ma-0 justify-start">
      <p class="body-2 pa-0 ma-0">
        Creator:
        <span class="font-weight-bold">{{ displayedCourse.creator.name }}</span>
      </p>
    </v-row>

    <v-row class="pa-2 ma-0 justify-start">
      <p class="body-2 pa-0 ma-0">
        <span>
          Price:
        </span>
        <span class="font-weight-bold">{{
          displayedCourse.price == 0 ? "Free" : `$${displayedCourse.price}`
        }}</span>
      </p>
    </v-row>
  </v-card>
</template>

<script>
export default {
  mounted() {
    console.log(this.course);
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    displayedCourse() {
      return this.course.courseId ? this.course.courseId : this.course;
    }
  },
  methods: {
    viewCourse(id) {
      this.$router.push(`/course/${id}`);
    }
  }
};
</script>
