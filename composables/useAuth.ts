interface User {
  id: number
  email: string
  [key: string]: any
}

interface AuthUtils {
  isAuthenticated: () => boolean
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}

export function useAuth(): AuthUtils {
  const isAuthenticated = (): boolean => {
    if (import.meta.client) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      return !!(token && user)
    }
    return false
  }

  const setToken = (token: string): void => {
    if (import.meta.client) {
      localStorage.setItem('token', token)
    }
  }

  const setUser = (user: User): void => {
    if (import.meta.client) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  const logout = (): void => {
    if (import.meta.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return {
    isAuthenticated,
    setToken,
    setUser,
    logout,
  }
}
