import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import SmallerButton from "../buttons/SmallerButton";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Auth");
  };

  return (
    <header className=" absolute z-50 top-0 w-full h-[80px] flex">
      <div className="text-white py-0 px-4 md:px-8 flex items-center justify-between max-w-[3000px] w-full mx-auto">
        <div className="flex items-center">
          <a
            href="/"
            className="flex items-center hover:scale-105 transition-all ease-out duration-300"
          >
            <img
              src="/images/vistora-logo.png"
              alt="Vistora Tech"
              className="w-auto h-[54px] sm:h-[64px] md:h-[80px]"
            />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm mr-8">
            <a href="/" className="text-gray-200 hover:text-white">
              Home
            </a>
            <a href="/faq" className="text-gray-200 hover:text-white">
              About & FAQ
            </a>
          </nav>
          <SmallerButton
            primary={true}
            buttonText={"Sign In"}
            action={handleClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
