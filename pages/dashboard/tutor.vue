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
            <v-btn icon color="primary" @click.stop="editCourse(course._id)">
              <v-icon>
                mdi-pencil-outline
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon color="error" @click.stop="alertDelete(course._id)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </card>
      </v-col>

      <v-dialog
        v-model="deleteDialog"
        scrollable
        persistent
        max-width="400px"
        transition="dialog-transition"
      >
        <v-card class="pa-2">
          <div class="px-2 text-center">
            <p class="ma-0 font-weight-bold text-h6">
              This course cannot be recovered.
            </p>
            <p class="ma-0">
              Are you sure you want to delete it?
            </p>
          </div>
          <v-card-actions>
            <v-btn depressed color="success" @click="deleteDialog = false">
              No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed color="error" @click="deleteCourse">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <notification
      @close="close"
      :dialog="notificationDialog"
      :text="notificationText"
    />
    <loading :dialog="loadingDialog" :text="loadingText" />
  </div>
</template>

<script>
import card from "~/components/CourseCard.vue";
import notification from "~/components/Notification";
import loading from "~/components/Loading";
import { handler } from "~/mixins/handler";

export default {
  components: {
    card,
    notification,
    loading
  },
  middleware: ["auth", "tutor-guard"],
  mixins: [handler],
  mounted() {
    this.userDetails = this.$auth.$state.user;
    localStorage.setItem("courses", JSON.stringify(this.courses));
  },
  async asyncData({ $axios }) {
    const { courses } = await $axios.$get(
      `/api/course/registration/get-all-courses-created`
    );
    return {
      courses
    };
  },
  data: () => ({
    userDetails: {},
    deleteDialog: false,
    timer: "",
    id: ""
  }),
  methods: {
    populateCourses() {
      this.courses = JSON.parse(localStorage.getItem("courses"));
    },
    alertDelete(id) {
      this.id = id;
      this.deleteDialog = true;
    },
    async deleteCourse() {
      try {
        this.deleteDialog = false;
        this.loadingDialog = true;
        this.loadingText = "Deleting course";

        const { message } = await this.$axios.$delete(
          `/api/course/delete/${this.id}`
        );

        const courses = JSON.parse(localStorage.getItem("courses"));
        const index = courses.findIndex(course => course._id == this.id);
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        this.populateCourses();

        this.loadingDialog = false;
        this.notificationDialog = true;
        this.notificationText = message;
        this.id = "";
        this.timer = setTimeout(() => {
          this.close();
        }, 3000);
      } catch (error) {
        this.handleError(error);
      }
    },
    editCourse(id) {
      this.$router.push({
        path: `/course/edit/${id}`
      });
    },
    close() {
      clearTimeout(this.timer);
      this.notificationDialog = false;
      this.notificationText = "";
    }
  }
};
</script>
