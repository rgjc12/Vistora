"use client";

import FormBtnSecondary from "../../components/buttons/FormBtnSecondary";

function VerificationPage({ navigate }) {
  const handleResendEmail = () => {
    console.log("Resending verification email");
    // Logic to resend verification email
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">One Final Step</h1>
        </div>

        <div className="mb-8 rounded-md border border-dashed border-gray-300 p-6">
          <p className="text-sm text-gray-600">
            We have sent a verification link to the email you used to register
            with us. Please check your email to{" "}
            <span className="text-black">finalize your registration</span>.
          </p>
        </div>

        <FormBtnSecondary
          buttonText={"Resend Email"}
          action={handleResendEmail}
        />

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
  );
}

export default VerificationPage;
