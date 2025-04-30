"use client";

import FormButtonSecondary from "../../components/buttons/FormButtonSecondary";

function VerificationPage({ navigate }) {
  const handleResendEmail = () => {
    console.log("Resending verification email");
    // Logic to resend verification email
  };

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

          <FormButtonSecondary
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
    </div>
  );
}

export default VerificationPage;
