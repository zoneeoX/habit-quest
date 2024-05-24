import React, { useEffect, useState } from "react";
import icon from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import supabase from "../database/supabase";
import ProfileModal from "./ProfileModal";
import { fetchUser } from "../feature/Slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user_information } = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  function navigateToHome() {
    navigate("/");
  }

  function openProfileModal() {
    setOpenModal((prevState) => !prevState);
  }

  return (
    <nav className="w-screen fixed left-0 top-0 px-24 py-8 z-50 text-white font-poppins flex flex-row justify-between">
      <section
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => navigateToHome()}
      >
        <img src={icon} alt="" className="w-16" />
        <h1 className="text-poppins font-bold text-2xl">Habit Quest</h1>
      </section>
      <section
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => openProfileModal()}
      >
        {user_information && Object.keys(user_information)?.length !== 0 && (
          <div className="bg-neutral-500 p-4 rounded-full relative overflow-hidden w-14 h-14 border-[0.5px] border-white/50">
            <img
              src={user_information?.user_metadata.profile_picture}
              className="object-cover inset-0 absolute w-full h-full"
              alt=""
            />
          </div>
        )}

        {openModal && user_information && Object.keys(user_information)?.length !== 0 && (
          <ProfileModal user={user_information} />
        )}
      </section>
    </nav>
  );
};

export default Navbar;
