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
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("https://victorta.free.beeceptor.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const result = await response.json();
  
      // Example: fake user response structure
      const userData = {
        id: result.id || "1",
        name: result.name || "Test User",
        email: result.email || email,
        userType: result.userType || "Admin",
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred during login");
      return false;
    } finally {
      setLoading(false);
    }
  };
  

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
  
    try {
      // Exclude confirmPassword from the payload
      const { confirmPassword, ...payload } = userData;
  
      const response = await fetch("https://victorta.free.beeceptor.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
  
      const result = await response.json();
      console.log("Signup success:", result);
      return true;
    } catch (e) {
      console.error("Signup error:", e.message);
      setError(e.message || "An error occurred during signup");
      return false;
    } finally {
      setLoading(false);
    }
  };
  

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
