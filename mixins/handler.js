export const handler = {
  data() {
    return {
      notificationDialog: false,
      notificationText: "",
      loadingDialog: false,
      loadingText: "Creating account"
    };
  },
  methods: {
    handleError(error) {
      clearTimeout(this.timer);
      if (!!error.response.data.message) {
        this.notificationText = error.response.data.message;
      } else {
        this.notificationText = error.response;
      }
      this.notificationDialog = true;
      this.loadingDialog = false;
      this.timer = setTimeout(() => {
        this.close();
      }, 4000);
    }
  }
};
