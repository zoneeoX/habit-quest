import React, { useState, useEffect } from "react";
import supabase from "../database/supabase";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

  async function signOut() {
    try {
      await supabase.auth.signOut();
      navigate("/");
      location.reload();
    } catch (e) {
      console.error("Error :", e);
    }
  }

  return (
    <div className="absolute w-52 h-52 flex flex-col text-black p-4 bg-white rounded-2xl z-50 top-28 right-4 cursor-default font-comfortaa">
      <p>
        {user?.user_metadata?.username
          ? user?.user_metadata.username
          : "........."}
      </p>
      <div className="bg-black w-full h-[0.5px] my-2" />

      <div
        className="flex flex-row justify-between bg-zinc-800 rounded-full px-2 text-white font-poppins items-center cursor-pointer py-1"
        onClick={signOut}
      >
        <h1>Sign Out</h1>
        <i className="">
          <IoChevronForward />
        </i>
      </div>
    </div>
  );
};

export default ProfileModal;
