import { createContext, useContext, useState, useEffect, useRef } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children, navigate }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isMounted = useRef(false)

  // Check for existing session on mount
  useEffect(() => {
    isMounted.current = true

    const storedUser = localStorage.getItem("user")
    if (storedUser && isMounted.current) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user data")
        localStorage.removeItem("user")
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // Simulating authentication for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "testuser@gmail.com" && password) {
        const userData = {
          id: "1",
          name: "Test User",
          email: email,
          userType: "Admin",
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred during login")
      return false
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // Simulating registration for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, we'll just return success
      console.log("User registered:", userData)
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred during signup")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate("login")
  }

  const resetPassword = async (email) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, we'll just return success
      console.log("Password reset requested for:", email)
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred during password reset")
      return false
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, we'll just return success
      console.log("Password updated successfully")
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred while updating password")
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
