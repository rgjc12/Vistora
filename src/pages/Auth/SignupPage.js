import { useState } from "react";

import { ChevronDown, Eye, EyeOff } from "../../components/auth/Icons";

import FormButtonSecondary from "../../components/buttons/FormButtonSecondary";
import FormButton from "../../components/buttons/FormButton";
import BackButton from "../../components/buttons/BackButton";
import { useAuth } from "../../contexts/AuthContext";

function SignupPage({ navigate, goBack, step = 1 }) {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    userType: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    organizationDetails: "",
    otherDetails: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const userTypes = ["Admin", "Healthcare Provider", "Patient"];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.userType) newErrors.userType = "User type is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.organizationDetails) {
      newErrors.organizationDetails = "Organization details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      navigate("signup-step2");
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const success = await signup(formData);
      if (success) {
        navigate("verification");
      }
    }
  };

  // Step 1: Basic Information
  if (step === 1) {
    return (
      <div className="flex flex-col min-[900px]:flex-row min-h-[800px] h-screen items-center bg-white w-full">
        <div className="bg-[#800020] w-full max-w-none min-[900px]:max-w-[800px] mb-8 min-[900px]:mb-0 h-[80px] min-[900px]:h-full flex relative">
          <a href="/" className="cursor-pointer ">
            <img
              src="/images/vistora-logo.png"
              alt="Vistora Technologies"
              className="w-full max-w-[200px] h-auto absolute top-0 min-[900px]:top-4 left-2 min-[900px]:left-4 z-20 hover:scale-105 ease-out duration-300"
            />
          </a>

          <img
            src="/images/doctor-bg-auth.jpg"
            alt="Doctor"
            className="w-full h-auto object-cover object-center hidden min-[900px]:block"
          />
        </div>
        <div className="flex w-full items-center justify-center bg-white">
          <div className="relative w-full max-w-md xl:max-w-[600px] px-6">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-[#6b1d1d]">
                Create Your Account
              </h1>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="userType"
                  className="text-sm font-medium text-gray-700"
                >
                  Select User Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
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
                            updateFormData("userType", type);
                            setDropdownOpen(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.userType && (
                  <p className="text-xs text-red-500">{errors.userType}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
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
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateFormData("confirmPassword", e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
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
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    updateFormData("acceptTerms", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-[#6b1d1d] focus:ring-[#6b1d1d]"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I Accept the Terms & Conditions
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-xs text-red-500">{errors.acceptTerms}</p>
              )}

              <FormButtonSecondary buttonText={"Next Step"} />
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("login")}
                className="font-medium text-[#6b1d1d] hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Organization Details
  return (
    <div className="flex flex-col min-[900px]:flex-row min-h-[800px] h-screen items-center bg-white w-full">
      <div className="bg-[#800020] w-full max-w-none min-[900px]:max-w-[800px] mb-8 min-[900px]:mb-0 h-[80px] min-[900px]:h-full flex relative">
        <a href="/" className="cursor-pointer ">
          <img
            src="/images/vistora-logo.png"
            alt="Vistora Technologies"
            className="w-full max-w-[200px] h-auto absolute top-0 min-[900px]:top-4 left-2 min-[900px]:left-4 z-20 hover:scale-105 ease-out duration-300"
          />
        </a>

        <img
          src="/images/doctor-bg-auth.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover object-center hidden min-[900px]:block"
        />
      </div>
      <div className="flex w-full items-center justify-center bg-white">
        <div className="relative w-full max-w-md xl:max-w-[600px] px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#6b1d1d]">
              Create Your Account
            </h1>
          </div>

          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="organizationDetails"
                className="text-sm font-medium text-gray-700"
              >
                Organization Details (name, etc.)
              </label>
              <input
                id="organizationDetails"
                type="text"
                value={formData.organizationDetails}
                onChange={(e) =>
                  updateFormData("organizationDetails", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                placeholder="Enter organization name"
              />
              {errors.organizationDetails && (
                <p className="text-xs text-red-500">
                  {errors.organizationDetails}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="otherDetails"
                className="text-sm font-medium text-gray-700"
              >
                Other Details
              </label>
              <input
                id="otherDetails"
                type="text"
                value={formData.otherDetails}
                onChange={(e) => updateFormData("otherDetails", e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
              />
            </div>

            <div className="rounded border border-gray-300 p-3">
              <div className="flex items-center">
                <input
                  id="recaptcha"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#6b1d1d] focus:ring-[#6b1d1d]"
                />
                <label
                  htmlFor="recaptcha"
                  className="ml-2 text-sm text-gray-600"
                >
                  I am not a robot
                </label>
                <div className="ml-auto">
                  <div className="h-10 w-10 bg-gray-100 text-[8px] text-gray-400 flex items-center justify-center">
                    reCAPTCHA
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <FormButton buttonText={"Registering..."} />
            ) : (
              <FormButton buttonText={"Register"} />
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("login")}
              className="font-medium text-[#6b1d1d] hover:underline"
            >
              Login
            </button>
          </div>

          <BackButton onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
