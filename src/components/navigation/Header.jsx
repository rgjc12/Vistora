import React from "react";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import SmallerButton from "../buttons/SmallerButton";
import { AlignJustify } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Auth");
  };

  return (
    <header className="absolute z-50 top-0 w-full h-[80px] flex max-w-[3000px] mx-auto py-0 px-4 md:px-8 ">
      <div className="text-white flex items-center justify-between w-full ">
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
        <div className="hidden md:flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm mr-8">
            <a
              href="/"
              className="text-gray-200 hover:text-white hover:underline hover:underline-offset-8"
            >
              Home
            </a>
            <a
              href="/faq"
              className="text-gray-200 hover:text-white  hover:underline hover:underline-offset-8"
            >
              About & FAQ
            </a>
          </nav>
          <SmallerButton
            primary={true}
            buttonText={"Sign In"}
            action={handleClick}
          />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
