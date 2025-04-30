import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButtonSecondary from "../../components/buttons/FormButtonSecondary";
import { toast } from "react-hot-toast";

function VerificationPage() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResendEmail = () => {
    toast.success("Verification email has been resent.");

    // Show confirmation message
    setShowConfirmation(true);

    // Hide after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 text-center space-y-6">
        <h1 className="text-2xl font-bold text-[#6b1d1d]">One Final Step</h1>

        <div className="rounded-md border border-dashed border-gray-300 p-6 bg-gray-50">
          <p className="text-sm text-gray-600">
            We have sent a verification link to your email. Please check your
            inbox to{" "}
            <span className="text-black font-medium">
              finalize your registration
            </span>
            .
          </p>
        </div>

        <FormButtonSecondary
          buttonText="Resend Email"
          action={handleResendEmail}
        />

        {showConfirmation && (
          <div className="mt-2 text-green-600 text-sm font-medium animate-fade-in-out">
            ✅ Verification email resent!
          </div>
        )}

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="font-medium text-[#6b1d1d] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerificationPage;
