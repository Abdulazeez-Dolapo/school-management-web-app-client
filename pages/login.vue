<template>
  <v-row class="ma-0 justify-center">
    <v-col class="pa-0" cols="12" sm="9" md="6">
      <v-card class="pa-3">
        <p class="ma-0 text-h4 pb-5 black--text text-center">
          Login
        </p>
        <v-form ref="loginForm">
          <v-text-field
            dense
            label="Email"
            primary
            type="email"
            outlined
            :rules="emailRules"
            v-model.trim="email"
          ></v-text-field>
          <v-text-field
            dense
            primary
            :append-icon="showText ? 'mdi-eye' : 'mdi-eye-off'"
            outlined
            :type="showText ? 'text' : 'password'"
            label="Password"
            @click:append="showText = !showText"
            :rules="passwordRules"
            v-model.trim="password"
          ></v-text-field>
        </v-form>

        <v-row class="ma-0 justify-center align-center pb-4">
          <v-btn depressed color="primary" block @click="login">Login</v-btn>
        </v-row>

        <v-row class="ma-0 justify-center align-center">
          <span class="ma-0">
            Don't have an account?
          </span>
          <v-spacer></v-spacer>
          <v-btn color="green" class="white--text" to="/register" depressed
            >Sign Up</v-btn
          >
        </v-row>
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
  middleware: "auth",
  auth: "guest",
  mixins: [handler],
  data() {
    return {
      showText: false,
      timer: "",
      email: "",
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length <= 16 || "Password must be not be more than 16 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  methods: {
    async login() {
      // Remove any residual courses in local storage
      localStorage.removeItem("courses");
      try {
        // Validate form inputs
        if (!this.$refs.loginForm.validate()) return;
        this.loadingText = "Loggin in";
        this.loadingDialog = true;
        this.notificationDialog = false;
        this.notificationText = "";

        const res = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });

        // Get all courses registered or created depending on user type
        let URL = `/api/course/registration/get-all-courses-created`;
        if (this.$auth.$state.user.role == "Student") {
          URL = `/api/course/registration/get-all-courses-registered`;
        }
        const { courses } = await this.$axios.$get(URL);
        localStorage.setItem("courses", JSON.stringify(courses));

        this.$router.push("/");
        this.loadingDialog = false;
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
