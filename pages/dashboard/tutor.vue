<template>
  <div>
    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 text-h3 pb-2 font-weight-bold">
        Welcome {{ userDetails.name }}
      </p>
    </v-row>

    <v-row class="ma-0 pl-1 justify-center justify-md-start">
      <p class="ma-0 pb-2">
        Here are a list of courses you have created
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
        <card :course="course">
          <template #action-buttons>
            <v-btn icon color="primary" @click="editCourse(course._id)">
              <v-icon>
                mdi-pencil-outline
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click="deleteCourse(course._id)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </card>
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
  middleware: ["auth", "tutor-guard"],
  mounted() {
    this.courses = JSON.parse(localStorage.getItem("courses"));
    this.userDetails = this.$auth.$state.user;
  },
  data: () => ({
    courses: [],
    userDetails: {},
    id: ""
  }),
  methods: {
    deleteCourse(id) {
      console.log(id);
    },
    editCourse(id) {
      this.$router.push({
        path: `/course/edit/${id}`
      });
    }
  }
};
</script>
