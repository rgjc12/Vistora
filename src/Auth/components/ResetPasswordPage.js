import { useState } from "react"
import { useAuth } from "../AuthContext"
import { Eye, EyeOff } from "./Icons"
import BackButton from "./BackButton"

function ResetPasswordPage({ navigate, goBack }) {
  const { updatePassword, loading } = useAuth()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate password
    if (password.length < 10) {
      setError("Password must be at least 10 characters long")
      return
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least 1 uppercase letter")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Handle password reset
    const success = await updatePassword(password)
    if (success) {
      setSubmitted(true)
    } else {
      setError("Failed to reset password. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="relative w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#6b1d1d]">Reset Password</h1>
        </div>

        {!submitted ? (
          <>
            <p className="mb-6 text-center text-sm text-gray-500">
              Please update your password. Must be 10 characters long and contain at least 1 uppercase.
            </p>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                    placeholder="••••••"
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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                    placeholder="••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#6b1d1d] py-2 text-sm font-medium text-white hover:bg-[#4a0f0f] focus:outline-none focus:ring-2 focus:ring-[#6b1d1d] disabled:opacity-70"
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-sm text-gray-600">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <button
              onClick={() => navigate("login")}
              className="rounded-md bg-[#6b1d1d] px-4 py-2 text-sm font-medium text-white hover:bg-[#4a0f0f]"
            >
              Go to Login
            </button>
          </div>
        )}

        <BackButton onClick={goBack} />
      </div>
    </div>
  )
}

export default ResetPasswordPage
