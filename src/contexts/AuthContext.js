import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children, navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  // Check for existing session on mount
  useEffect(() => {
    isMounted.current = true;

    const storedUser = localStorage.getItem("user");
    if (storedUser && isMounted.current) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data");
        localStorage.removeItem("user");
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  // LOGIN: Use POST, send credentials in body, handle errors properly
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://victorta.free.beeceptor.com/login", {
        method: "POST", // changed from GET to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // now allowed in POST
      });

      // Check for HTTP error codes
      if (!response.ok) {
        let errorMsg = "Login failed";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // ignore parsing error
        }
        throw new Error(errorMsg);
      }

      // Parse response data
      const result = await response.json();

      // Assuming API returns user data here; fallback to dummy
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

  // SIGNUP remains mostly same — POST with payload minus confirmPassword
  const signup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...payload } = userData;

      const response = await fetch("https://victorta.free.beeceptor.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = "Signup failed";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // ignore parse error
        }
        throw new Error(errorMsg);
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

  // LOGOUT: clear user & localStorage, navigate to login
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    if (navigate) {
      navigate("/login"); // Ensure navigate prop exists
    }
  };

  // Reset password - stub for demo
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password reset requested for:", email);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred during password reset");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update password - stub for demo
  const updatePassword = async (password) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password updated successfully");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred while updating password");
      return false;
    } finally {
      setLoading(false);
    }
  };

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
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
