export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const publicRoutes = ["/"];
    const protectedRoutes = ["/welcome"];
    const authRoutes = ["/login", "/register"];

    if ((!token || !user) && protectedRoutes.includes(to.path)) {
      return navigateTo("/login");
    }

    if (token && user && authRoutes.includes(to.path)) {
      return navigateTo("/welcome");
    }
  }
});
