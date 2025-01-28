export const useAuth = () => {
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
    setToken,
    setUser,
    logout,
  };
};
