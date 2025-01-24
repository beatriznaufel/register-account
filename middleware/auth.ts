export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");
    if (!token && to.path !== "/") {
      return navigateTo("/");
    }
  }
});
