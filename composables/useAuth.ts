export const useAuth = () => {
  const isAuthenticated = () => {
    if (import.meta.client) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      return !!(token && user);
    }
    return false;
  };

  const setToken = (token: string) => {
    if (import.meta.client) {
      localStorage.setItem("token", token);
    }
  };

  const setUser = (user: any) => {
    if (import.meta.client) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return {
    isAuthenticated,
    setToken,
    setUser,
    logout,
  };
};
