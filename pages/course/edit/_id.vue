<template>
  <div>
    <Course :action="action" />
  </div>
</template>

<script>
import Course from "~/components/Course.vue";
export default {
  components: {
    Course
  },
  data: () => ({
    action: "Edit"
  })
};
</script>

<style></style>
