import React from "react";
import icon from "../assets/icon.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/");
  }

  return (
    <nav className="w-screen fixed left-0 top-0 px-24 py-8 z-50 text-white font-poppins">
      <section
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => navigateToHome()}
      >
        <img src={icon} alt="" className="w-16" />
        <h1 className="text-poppins font-bold text-2xl">Habit Quest</h1>
      </section>
    </nav>
  );
};

export default Navbar;
