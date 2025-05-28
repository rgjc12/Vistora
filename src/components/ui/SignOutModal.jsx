import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // make sure this path is correct
import { useNavigate } from "react-router-dom";
import SmallerButton from "../buttons/SmallerButton";

const SignOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      onClose(); // close modal after signing out
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl relative animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Confirm Sign Out
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to sign out?
        </p>
        <div className="flex flex-col justify-center md:flex-row md:justify-end gap-4">
          <SmallerButton
            buttonText={"Cancel"}
            action={onClose}
            primary={true}
            border={true}
          />
          <SmallerButton
            buttonText={"Sign Out"}
            action={handleSignOut}
            destructive={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
