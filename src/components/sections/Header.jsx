import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../buttons/PrimaryBtn";
import SmallerBtn from "../buttons/SmallerBtn";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Auth");
  };

  return (
    <header
      className="marble-bg text-white py-2 px-4 md:px-8 flex items-center justify-between"
      style={{ backgroundColor: "#800020" }}
    >
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
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="text-gray-200 hover:text-white">
            Home
          </a>
        </nav>
        <SmallerBtn
          primary={true}
          buttonText={"Sign In"}
          action={handleClick}
        />
      </div>
    </header>
  );
};

export default Header;
