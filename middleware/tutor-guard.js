export default function({ store, redirect }) {
  // Check if user is not a tutor
  if (store.state.auth.user.role != "Tutor") {
    return redirect("/");
  }
}
