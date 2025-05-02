import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/buttons/FormButton";
import BackButton from "../../components/buttons/BackButton";

function ForgotPasswordPage({ goBack }) {
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const success = await resetPassword(email);
    if (success) {
      setSubmitted(true);
    } else {
      setError("Failed to send reset email. Please try again.");
    }
  };

  const showEmailToResetPasswordInstructions = () => (
    <>
      <p className="mb-6 text-center text-sm text-gray-500">
        Please enter the email linked to your account so we can send you a link
        to reset your password.
      </p>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Registered Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b1d1d]"
            placeholder="Enter your registered email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#6b1d1d] py-2 text-sm font-medium text-white hover:bg-[#4a0f0f] focus:outline-none focus:ring-2 focus:ring-[#6b1d1d] disabled:opacity-70"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>
    </>
  );

  const showOnScreenResetPasswordInstruction = () => (
    <div className="text-center">
      <p className="mb-6 text-sm text-gray-600">
        If an account exists with the email <strong>{email}</strong>, we've sent
        instructions to reset your password. Please check your inbox.
      </p>

      <button
              onClick={() => navigate("/auth/login")}
              className="font-medium text-[#6b1d1d] hover:underline"
            >
           Return to Login
            </button>
    </div>
  );

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

        <div className="bg-[#800020] opacity-0 min-[900px]:opacity-45 absolute top-0 left-0 right-0 bottom-0 "></div>
        <img
          src="/images/doctor-bg-auth.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover object-center hidden min-[900px]:block"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-md px-6">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#6b1d1d]">
              Reset Password
            </h1>
          </div>

          {submitted
            ? showOnScreenResetPasswordInstruction()
            : showEmailToResetPasswordInstructions()}

          <BackButton onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
