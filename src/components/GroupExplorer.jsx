import React from "react";
import { IoAdd, IoPersonAddSharp } from "react-icons/io5";
import { redirect, useNavigate } from "react-router-dom";
import UseNavigateHook from "../hooks/UseNavigateHook";

const GroupExplorer = () => {
  const navigate = useNavigate();

  function navigateNewGroup() {
    navigate("/dashboard/new");
  }

  function navigateDiscover(){
    navigate('/dashboard/discover')
  }

  return (
    <div className="flex flex-col gap-6 font-poppins font-bold">
      <div
        className="bg-zinc-700 h-48 g flex flex-col gap-6 justify-center items-center rounded-xl shadow-lg border border-white/50 hover:bg-zinc-600 transition-all cursor-pointer"
        onClick={navigateDiscover}
      >
        <i className="text-black bg-white p-2 rounded-full">
          <IoPersonAddSharp />
        </i>
        DISCOVER GROUPS
      </div>
      <div className="bg-white w-full h-[0.5px] opacity-50" />
      <div
        className="bg-zinc-700 h-48 g flex flex-col gap-6 justify-center items-center rounded-xl shadow-lg border border-white/50 hover:bg-zinc-600 transition-all cursor-pointer"
        onClick={navigateNewGroup}
      >
        <i className="text-black bg-white p-2 rounded-full">
          <IoAdd />
        </i>
        NEW GROUP
      </div>
    </div>
  );
};

export default GroupExplorer;
