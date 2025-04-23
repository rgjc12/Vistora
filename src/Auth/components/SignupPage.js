"use client"

import { useState } from "react"
import { useAuth } from "../AuthContext"
import { ChevronDown, Eye, EyeOff } from "./Icons"

function SignupPage({ navigate, step = 1 }) {
  const { signup, loading } = useAuth()
  const [formData, setFormData] = useState({
    name: "John Doe",
    userType: "",
    email: "testuser@gmail.com",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    organizationDetails: "",
    otherDetails: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [errors, setErrors] = useState({})

  const userTypes = ["Admin", "Healthcare Provider", "Patient"]

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.userType) newErrors.userType = "User type is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.organizationDetails) {
      newErrors.organizationDetails = "Organization details are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    if (validateStep1()) {
      navigate("signup-step2")
    }
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    if (validateStep2()) {
      const success = await signup(formData)
      if (success) {
        navigate("verification")
      }
    }
  }

  // Step 1: Basic Information
  if (step === 1) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="w-full max-w-md px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="userType" className="text-sm font-medium text-gray-700">
                Select User Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {formData.userType || "Select User Type"}
                  <ChevronDown />
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                    {userTypes.map((type) => (
                      <div
                        key={type}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          updateFormData("userType", type)
                          setDropdownOpen(false)
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.userType && <p className="text-xs text-red-500">{errors.userType}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="testuser@gmail.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => updateFormData("acceptTerms", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I Accept the Terms & Conditions
              </label>
            </div>
            {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms}</p>}

            <button
              type="submit"
              className="w-full rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Next Step
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate("login")} className="font-medium text-black hover:underline">
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Organization Details
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
        </div>

        <form onSubmit={handleStep2Submit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="organizationDetails" className="text-sm font-medium text-gray-700">
              Organization Details (name, etc.)
            </label>
            <input
              id="organizationDetails"
              type="text"
              value={formData.organizationDetails}
              onChange={(e) => updateFormData("organizationDetails", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="John Doe"
            />
            {errors.organizationDetails && <p className="text-xs text-red-500">{errors.organizationDetails}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="otherDetails" className="text-sm font-medium text-gray-700">
              Other Details
            </label>
            <input
              id="otherDetails"
              type="text"
              value={formData.otherDetails}
              onChange={(e) => updateFormData("otherDetails", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigate("login")} className="font-medium text-black hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
