import React, { useState, useEffect } from "react";
import supabase from "../../database/supabase";
import Navbar from "../../components/Navbar";

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
    <div className="bg-zinc-800 w-screen h-screen flex justify-center items-center text-white">
      <Navbar />
      <h1 className="text-4xl font-poppins text-center">
        hey {formatEmail(user?.email)} You just arrived in the dashboard, that
        means everything went alright :D
      </h1>
    </div>
  );
};

export default Dashboard;
