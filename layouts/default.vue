<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app class="elevation-0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="hover" @click="home" v-text="title" />
      <v-spacer />
      <v-btn text to="/login" class="ma-0" v-if="!$auth.$state.loggedIn">
        Login
      </v-btn>

      <v-btn text @click="logout" class="ma-0" v-else>
        Logout
      </v-btn>

      <template v-if="$auth.$state.loggedIn">
        <v-btn
          text
          v-if="$auth.$state.user.role === 'Tutor'"
          to="/course/create"
          class="ma-0"
        >
          Create Course
        </v-btn>
      </template>

      <template v-if="$auth.$state.loggedIn">
        <v-btn :to="`/dashboard/${userType}`" class="text-capitalize" text>
          {{ $auth.$state.user.name }}
        </v-btn></template
      >
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <v-row class="ma-0 justify-center">
        <a
          href="https://www.linkedin.com/in/abdulazeezabdulrafiudolapo96"
          target="_blank"
          rel="noopener noreferrer"
          >Abdulazeez Dolapo Abdulrafiu &copy; {{ new Date().getFullYear() }}</a
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    userType() {
      if (!this.$auth.$state.loggedIn) return;
      return this.$auth.$state.user.role == "Tutor" ? "tutor" : "student";
    },
    items() {
      let items = [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Dashboard",
          to: `/dashboard/${this.userType}`
        },
        {
          icon: "mdi-chart-bubble",
          title: "Create Course",
          to: `/course/create`
        }
      ];
      if (
        this.$auth.$state.loggedIn &&
        this.$auth.$state.user.role == "Tutor"
      ) {
        return items;
      }
      items.length = 2;
      return items;
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: "School Management App"
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("courses");
      this.$auth.logout();
    },
    home() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.hover:hover {
  cursor: pointer;
}
</style>
