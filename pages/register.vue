<template>
  <v-row class="ma-0 justify-center">
    <v-col class="pa-0" cols="12" sm="9" md="6">
      <v-card class="pa-3">
        <p class="ma-0 text-h4 pb-5 black--text text-center">
          Create Account
        </p>
        <v-form ref="registerForm">
          <v-select
            outlined
            label="Register as"
            dense
            primary
            v-model="role"
            :items="roles"
          ></v-select>
          <v-text-field
            dense
            type="text"
            primary
            label="Username"
            outlined
            :rules="nameRules"
            v-model.trim="username"
          ></v-text-field>
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
          <v-btn depressed color="primary" block @click="register"
            >Sign Up</v-btn
          >
        </v-row>

        <v-row class="ma-0 justify-center align-center">
          <span class="ma-0">
            Already have an account?
          </span>
          <v-spacer></v-spacer>
          <v-btn color="green" class="white--text" to="/login" depressed
            >Login</v-btn
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
import notification from "~/components/notification";
import loading from "~/components/loading";
import { handler } from "../mixins/handler";
export default {
  components: {
    notification,
    loading
  },
  mixins: [handler],
  data() {
    return {
      showText: false,
      time: "",
      username: "",
      role: "Student",
      email: "",
      password: "",
      roles: ["Student", "Tutor"],
      nameRules: [
        v => !!v || "Username is required",
        v => v.length <= 8 || "Username must be less than 8 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be at least 8 characters",
        v => v.length <= 16 || "Password must be not be less than 16 characters"
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
    async register() {
      try {
        // Validate form inputs
        if (!this.$refs.registerForm.validate()) return;
        this.loadingDialog = true;
        this.notificationDialog = false;
        this.notificationText = "";

        const data = {
          name: this.username,
          role: this.role,
          email: this.email,
          password: this.password
        };

        let res = await this.$axios.$post("/api/auth/register", data);
        this.loadingDialog = false;

        // If succesfully signed up, login user
        if (res.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        }

        this.loadingDialog = false;

        this.timer = setTimeout(() => {
          this.close();
        }, 4000);
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
