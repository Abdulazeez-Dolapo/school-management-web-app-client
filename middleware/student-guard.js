export default function({ store, redirect }) {
  // Check if user is not a student
  if (store.state.auth.user.role != "Student") {
    return redirect("/");
  }
}
