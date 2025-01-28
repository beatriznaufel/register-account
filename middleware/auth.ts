export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const publicRoutes = ["/", "/login", "/register"];
    const protectedRoutes = ["/welcome"];

    if ((!token || !user) && !publicRoutes.includes(to.path)) {
      return navigateTo("/login");
    }

    if (token && user && publicRoutes.includes(to.path)) {
      return navigateTo("/welcome");
    }
  }
});
