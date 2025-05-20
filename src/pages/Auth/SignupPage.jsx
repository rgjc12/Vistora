import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "../../components/auth/Icons";
import FormButtonSecondary from "../../components/buttons/FormButtonSecondary";
import FormButton from "../../components/buttons/FormButton";
import BackButton from "../../components/buttons/BackButton";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
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

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }
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
    if (validateStep1()) setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const success = await signup(formData);
      console.log("Signup success value:", success); // Debug log
  
      if (success) {
        navigate("/verification"); 
      } else {
        alert("Signup failed — please check your input or try again.");
      }
    }
  };
  
  const handleLoginClick = () => navigate("/auth/login");

  return (
    <div className="flex flex-col min-[900px]:flex-row min-h-[800px] h-screen items-center bg-white w-full">
      {/* Left Side with Image */}
      <div className="bg-primary w-full min-[900px]:max-w-[800px] h-[80px] min-[900px]:h-full flex relative">
        <a href="/" className="cursor-pointer">
          <img
            src="/images/vistora-logo.png"
            alt="Vistora Technologies"
            className="w-full max-w-[200px] h-auto absolute top-0 min-[900px]:top-4 left-2 min-[900px]:left-4 z-20 hover:scale-105 transition-all"
          />
        </a>
        <div className="bg-primary opacity-0 min-[900px]:opacity-45 absolute top-0 left-0 right-0 bottom-0 "></div>
        <img
          src="/images/doctor-bg-auth.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover object-center hidden min-[900px]:block"
        />
      </div>

      {/* Form Content */}
      <div className="flex w-full items-center justify-center bg-white">
        <div className="relative w-full max-w-md xl:max-w-[600px] px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#6b1d1d]">
              Create Your Account
            </h1>
          </div>

          {/* Unified form element to avoid focus-loss on re-renders */}
          <form
            onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit}
            className="space-y-4"
          >
            {step === 1 ? (
              <>
                {/* Name */}
                <Input
                  label="Name"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  error={errors.name}
                />

                {/* User Type Dropdown */}
                <div>
                  <label
                    htmlFor="userType"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select User Type
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex justify-between items-center border px-3 py-2 rounded-md text-sm"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {formData.userType || "Select User Type"}
                      <ChevronDown />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute z-10 w-full bg-white border rounded shadow-md mt-1">
                        {userTypes.map((type) => (
                          <div
                            key={type}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
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
                  {errors.userType && <ErrorText message={errors.userType} />}
                </div>

                {/* Email */}
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  error={errors.email}
                />

                {/* Password */}
                <PasswordInput
                  label="Password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  show={showPassword}
                  toggleShow={() => setShowPassword(!showPassword)}
                  error={errors.password}
                />

                {/* Confirm Password */}
                <PasswordInput
                  label="Confirm Password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  show={showConfirmPassword}
                  toggleShow={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  error={errors.confirmPassword}
                />

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      updateFormData("acceptTerms", e.target.checked)
                    }
                    className="h-4 w-4 border rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I Accept the Terms & Conditions
                  </label>
                </div>
                {errors.acceptTerms && (
                  <ErrorText message={errors.acceptTerms} />
                )}

                <FormButtonSecondary buttonText="Next Step" />
              </>
            ) : (
              <>
                <Input
                  label="Organization Details"
                  id="organizationDetails"
                  value={formData.organizationDetails}
                  onChange={(e) =>
                    updateFormData("organizationDetails", e.target.value)
                  }
                  error={errors.organizationDetails}
                />

                <Input
                  label="Other Details"
                  id="otherDetails"
                  value={formData.otherDetails}
                  onChange={(e) =>
                    updateFormData("otherDetails", e.target.value)
                  }
                />

                <FormButton
                  buttonText={loading ? "Registering..." : "Register"}
                />
                <BackButton onClick={() => setStep(1)} />
              </>
            )}
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
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

export default SignupPage;

// ✅ Reusable Input Component
function Input({ label, id, value, onChange, type = "text", error }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[#6b1d1d]"
      />
      {error && <ErrorText message={error} />}
    </div>
  );
}

// ✅ Reusable Password Input with toggle
function PasswordInput({
  label,
  id,
  value,
  onChange,
  show,
  toggleShow,
  error,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[#6b1d1d]"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={toggleShow}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && <ErrorText message={error} />}
    </div>
  );
}

// ✅ Error Text
function ErrorText({ message }) {
  return <p className="text-xs text-red-500">{message}</p>;
}
