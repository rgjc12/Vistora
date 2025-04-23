"use client"

import { useState } from "react"
import { useAuth } from "../AuthContext"
import { Eye, EyeOff } from "./Icons"

function LoginPage({ navigate }) {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState("testuser@gmail.com")
  const [password, setPassword] = useState("••••••")
  const [showPassword, setShowPassword] = useState(false)
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    if (!email || !password) {
      setFormError("Please enter both email and password")
      return
    }

    const success = await login(email, password)
    if (success) {
      // Navigate to dashboard or home page in a real app
      console.log("Login successful")
    } else {
      setFormError(error || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{formError}</div>}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline"
              onClick={() => navigate("forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex items-center">
            <input
              id="stay-logged-in"
              type="checkbox"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
            />
            <label htmlFor="stay-logged-in" className="ml-2 text-sm text-gray-600">
              Stay logged in on this device
            </label>
          </div>

          <div className="rounded border border-gray-300 p-3">
            <div className="flex items-center">
              <input
                id="recaptcha"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
              />
              <label htmlFor="recaptcha" className="ml-2 text-sm text-gray-600">
                I am not a robot
              </label>
              <div className="ml-auto">
                <div className="h-10 w-10 bg-gray-100 text-[8px] text-gray-400 flex items-center justify-center">
                  reCAPTCHA
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button onClick={() => navigate("signup")} className="font-medium text-black hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
