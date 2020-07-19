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
    action: "Create"
  })
};
</script>

<style></style>
