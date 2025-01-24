export const useAuth = () => {
  const isAuthenticated = ref(false);

  const checkAuth = () => {
    if (import.meta.client) {
      isAuthenticated.value = !!localStorage.getItem("token");
    }
  };

  const setToken = (token: string) => {
    if (import.meta.client) {
      localStorage.setItem("token", token);
      isAuthenticated.value = true;
    }
  };

  const clearToken = () => {
    if (import.meta.client) {
      localStorage.removeItem("token");
      isAuthenticated.value = false;
    }
  };

  return {
    isAuthenticated,
    checkAuth,
    setToken,
    clearToken,
  };
};
