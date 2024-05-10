import React from "react";
import icon from "../assets/icon.png";

const Navbar = () => {


  return (
    <nav className="w-screen fixed left-0 top-0 px-24 py-8 z-50 text-white">
      <section className="flex flex-row items-center gap-2">
        <img src={icon} alt="" className="w-16" />
        <h1 className="text-poppins font-bold text-2xl">Habit Quest</h1>
      </section>
    </nav>
  );
};

export default Navbar;
