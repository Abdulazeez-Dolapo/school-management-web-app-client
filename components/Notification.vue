<template>
  <div class="text-center">
    <v-snackbar v-model="dialog">
      <!-- <span> -->
      {{ text }}
      <!-- </span>
      <v-spacer></v-spacer> -->
      <v-btn color="pink" text @click="close">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean
    },
    text: {
      type: [String, Array, Object]
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  beforeDestroy() {
    this.close();
  }
};
</script>
<style></style>
