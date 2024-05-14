import React, { useEffect, useState } from "react";
import icon from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import supabase from "../database/supabase";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }

    getUserData();
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
        {Object.keys(user).length !== 0 && (
          <div className="bg-neutral-500 p-4 rounded-full">
            <i className="text-2xl">
              <IoPersonSharp />
            </i>
          </div>
        )}

        {openModal && Object.keys(user).length !== 0 && <ProfileModal />}
      </section>
    </nav>
  );
};

export default Navbar;
