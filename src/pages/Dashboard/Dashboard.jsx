import React, { useState, useEffect } from "react";
import supabase from "../../database/supabase";
import Navbar from "../../components/Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

const Dashboard = () => {
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

  const formatEmail = (email) => {
    return email?.replace(/@.*/, "");
  };

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden">
        <div className="grid grid-cols-3 place-items-center gap-6">
          <div className="flex flex-col gap-4 text-xl font-poppins font-semibold">
            <div className="bg-zinc-700 h-56 w-[26rem] flex flex-col gap-6 justify-center items-center rounded-xl shadow-lg border border-white/50">
              <i className="text-black bg-white p-2 rounded-full">
                <IoPersonAddSharp />
              </i>
              DISCOVER GROUPS
            </div>
            <div className="bg-white w-full h-[0.5px] opacity-50" />
            <div className="bg-zinc-700 h-56 w-[26rem] flex justify-center items-center rounded-xl shadow-lg border border-white/50 flex-col gap-6">
              <i className="text-black bg-white p-2 rounded-full">
                <IoAdd />
              </i>
              NEW GROUP
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
