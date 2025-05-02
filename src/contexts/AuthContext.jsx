import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const stored = localStorage.getItem("user");

    if (stored && isMounted.current) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Invalid stored user");
        localStorage.removeItem("user");
      }
    }

    return () => { isMounted.current = false; };
  }, []);

  const simulateDelay = () => new Promise(res => setTimeout(res, 1000));

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      await simulateDelay();
      if (email === "testuser@gmail.com" && password) {
        const userData = { id: "1", name: "Test User", email, userType: "Admin" };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      throw new Error("Invalid credentials");
    } catch (e) {
      setError(e.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true); setError(null);
    try {
      await simulateDelay();
      console.log("User registered:", userData);
      return true;
    } catch (e) {
      setError(e.message || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("login");
  };

  const resetPassword = async (email) => {
    setLoading(true); setError(null);
    try {
      await simulateDelay();
      console.log("Password reset requested for:", email);
      return true;
    } catch (e) {
      setError(e.message || "Reset failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password) => {
    setLoading(true); setError(null);
    try {
      await simulateDelay();
      console.log("Password updated");
      return true;
    } catch (e) {
      setError(e.message || "Update failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, loading, error,
      login, signup, logout,
      resetPassword, updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
