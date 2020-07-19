<template>
  <v-row class="ma-0 justify-center pt-12">
    <v-col class="pa-0" cols="12" sm="9" md="6">
      <v-card class="pa-3">
        <p class="ma-0 text-h4 pb-5 black--text text-center">
          {{ action }} Course
        </p>
        <v-form ref="courseForm">
          <v-text-field
            dense
            type="text"
            primary
            label="Course Title"
            outlined
            :rules="titleRules"
            v-model.trim="title"
          ></v-text-field>

          <v-text-field
            dense
            type="text"
            primary
            label="Course Description"
            outlined
            :rules="descriptionRules"
            v-model.trim="description"
          ></v-text-field>

          <v-text-field
            dense
            type="number"
            primary
            label="Course Price"
            outlined
            :rules="priceRules"
            v-model.number="price"
          ></v-text-field>

          <v-row class="ma-0 justify-center align-center pb-4">
            <v-btn
              type="submit"
              depressed
              color="primary"
              block
              @click.prevent="takeAction"
              >{{ action }} Course</v-btn
            >
          </v-row>
        </v-form>
      </v-card>
    </v-col>

    <notification
      @close="close"
      :dialog="notificationDialog"
      :text="notificationText"
    />
    <loading :dialog="loadingDialog" :text="loadingText" />
  </v-row>
</template>

<script>
import notification from "~/components/Notification";
import loading from "~/components/Loading";
import { handler } from "~/mixins/handler";

export default {
  components: {
    notification,
    loading
  },
  mixins: [handler],
  mounted() {
    if (this.action == "Edit") {
      this.getCourse(this.$route.params.id);
    }
  },
  props: {
    action: {
      type: String,
      default: "Create"
    }
  },
  data() {
    return {
      timer: "",
      title: "",
      description: "",
      price: 0,
      titleRules: [
        v => !!v || "Title is required",
        v => v.length >= 3 || "Title must be at least 3 characters"
      ],
      descriptionRules: [
        v => !!v || "Description is required",
        v => v.length >= 3 || "Description must be at least 3 characters"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => typeof v == "number" || "Price must be a number"
      ]
    };
  },
  methods: {
    takeAction() {
      if (this.action == "Create") this.createCourse();
      if (this.action == "Edit") this.editCourse();
    },
    async createCourse() {
      try {
        // Validate form inputs
        if (!this.$refs.courseForm.validate()) return;
        this.loadingDialog = true;
        this.loadingText = "Creating course";

        const payload = {
          title: this.title,
          description: this.description,
          price: this.price
        };

        const { message } = await this.$axios.$post(
          "/api/course/create",
          payload
        );

        this.loadingDialog = false;
        this.notificationDialog = true;
        this.notificationText = message;

        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      } catch (error) {
        this.handleError(error);
      }
    },
    async editCourse() {
      try {
        // Validate form inputs
        if (!this.$refs.courseForm.validate()) return;
        this.loadingDialog = true;
        this.loadingText = "Editing course";

        const payload = {
          title: this.title,
          description: this.description,
          price: this.price
        };

        const id = this.$route.params.id;
        const { message } = await this.$axios.$put(
          `/api/course/update/${id}`,
          payload
        );

        const courses = JSON.parse(localStorage.getItem("courses"));
        const index = courses.findIndex(course => course._id == id);
        const course = courses[index];
        course.title = this.title;
        course.description = this.description;
        course.price = this.price;
        courses.splice(index, 1, course);
        localStorage.setItem("courses", JSON.stringify(courses));

        this.loadingDialog = false;
        this.notificationDialog = true;
        this.notificationText = message;

        setTimeout(() => {
          this.$router.push({ path: "/dashboard/tutor" });
        }, 1000);
      } catch (error) {
        this.handleError(error);
      }
    },
    async getCourse(id) {
      try {
        const { course } = await this.$axios.$get(
          `/api/course/get-course/${id}`
        );
        this.title = course.title;
        this.description = course.description;
        this.price = course.price;
      } catch (error) {
        this.handleError(error);
      }
    },
    close() {
      clearTimeout(this.timer);
      this.notificationDialog = false;
      this.notificationText = "";
    }
  }
};
</script>

<style></style>
