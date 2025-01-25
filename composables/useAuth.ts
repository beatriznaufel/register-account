import type { Ref } from "vue";

interface User {
  id: number;
  email: string;
}

export const useAuth = () => {
  const token: Ref<string | null> = useState("token", () => null);
  const user: Ref<User | null> = useState("user", () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    if (import.meta.client) {
      localStorage.setItem("token", newToken);
    }
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    if (import.meta.client) {
      localStorage.removeItem("token");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  };

  const isAuthenticated = computed(() => !!token.value);

  if (import.meta.client) {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      token.value = savedToken;
    }
  }

  return {
    token,
    user,
    setToken,
    setUser,
    logout,
    isAuthenticated,
  };
};

export type AuthComposable = ReturnType<typeof useAuth>;
