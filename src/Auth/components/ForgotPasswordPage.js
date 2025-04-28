import { useState } from "react";
import { useAuth } from "../AuthContext";
import BackButton from "./BackButton";
import FormButton from "../../components/buttons/FormButton";

function ForgotPasswordPage({ navigate, goBack }) {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="relative w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#6b1d1d]">Reset Password</h1>
        </div>

        {!submitted ? (
          <>
            <p className="mb-6 text-center text-sm text-gray-500">
              Please enter the email linked to your account so we can send you a
              link to reset your password.
            </p>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
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

              {loading ? (
                <FormButton buttonText={"Sending..."} />
              ) : (
                <FormButton buttonText={"Reset Password"} />
              )}
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-sm text-gray-600">
              If an account exists with the email <strong>{email}</strong>,
              we've sent instructions to reset your password. Please check your
              inbox.
            </p>

            <button
              onClick={() => navigate("login")}
              className="text-sm font-medium text-[#6b1d1d] hover:underline"
            >
              Return to login
            </button>
          </div>
        )}

        <BackButton onClick={goBack} />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
