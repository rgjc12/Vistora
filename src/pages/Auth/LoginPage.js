import { useState } from "react";
import { Eye, EyeOff } from "../../components/auth/Icons";
import FormButton from "../../components/buttons/FormButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function LoginPage({ navigate }) {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please enter both email and password");
      return;
    }

    const success = await login(email, password);
    if (success) {
      // Navigate to dashboard or home page in a real app
      console.log("Login successful");
    } else {
      setFormError(error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col min-[900px]:flex-row min-h-[800px] h-screen items-center bg-white w-full">
      <div className="bg-primary w-full max-w-none min-[900px]:max-w-[800px] mb-8 min-[900px]:mb-0 h-[80px] min-[900px]:h-full flex relative">
        <a href="/" className="cursor-pointer ">
          <img
            src="/images/vistora-logo.png"
            alt="Vistora Technologies"
            className="w-full max-w-[200px] h-auto absolute top-0 min-[900px]:top-4 left-2 min-[900px]:left-4 z-20 hover:scale-105 ease-out duration-300"
          />
        </a>

        <div className="bg-primary opacity-0 min-[900px]:opacity-45 absolute top-0 left-0 right-0 bottom-0 "></div>
        <img
          src="/images/doctor-bg-auth.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover object-center hidden min-[900px]:block"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-md xl:max-w-[600px] px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#6b1d1d]">Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                {formError}
              </div>
            )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                placeholder="Enter your email"
                required
              />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
                  placeholder="Enter your password"
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
                className="text-sm text-[#6b1d1d] hover:underline"
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
                className="h-4 w-4 rounded border-gray-300 text-[#6b1d1d] focus:ring-[#6b1d1d]"
              />
              <label
                htmlFor="stay-logged-in"
                className="ml-2 text-sm text-gray-600"
              >
                Stay logged in on this device
              </label>
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
              <FormButton buttonText={"Logging in..."} />
            ) : (
              <FormButton buttonText={"Login"} />
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("signup")}
              className="font-medium text-[#6b1d1d] hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
