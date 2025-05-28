import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallerButton from "../buttons/SmallerButton";
import PrimaryButton from "../buttons/PrimaryButton";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Auth");
  };

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="md:hidden">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="text-white z-50 hover:scale-105 ease-out duration-150"
      >
        <AlignJustify />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        style={{ width: "80vw", maxWidth: "300px" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-primary">Menu</h2>
          <button onClick={closeMenu}>
            <X size={24} className="text-primary" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-6 text-lg">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-gray-800 hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/faq"
            onClick={closeMenu}
            className="text-gray-800 hover:text-primary"
          >
            About & FAQ
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="text-gray-800 hover:text-primary mb-10"
            >
              My Dashboard
            </Link>
          )}
          {isLoading ? (
            <div className="w-[120px] flex h-8 bg-neutral-400 animate-loading rounded-lg"></div>
          ) : user ? (
            <PrimaryButton
              primary={true}
              bkgColor={"bg-primary"}
              textColor={"text-white"}
              buttonText={"Sign Out"}
              action={() => navigate("/dashboard")}
            />
          ) : (
            <PrimaryButton
              primary={true}
              bkgColor={"bg-primary"}
              textColor={"text-white"}
              buttonText={"Sign In"}
              action={handleClick}
            />
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
