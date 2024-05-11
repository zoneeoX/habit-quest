import React, { useState, useEffect } from "react";
import rocketIcon from "../../assets/icons8-rocket-96.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import supabase from "../../database/supabase";

const Hero = () => {
  const navigate = useNavigate();

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

  function redirect() {
    if (Object.keys(user).length !== 0) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  }

  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-8 grid grid-cols-1 place-content-center gap-10 overflow-hidden relative">
      <Navbar />

      <section className="grid grid-cols-1 gap-y-10 relative">
        <h1 className="font-poppins font-extrabold text-7xl md:text-8xl text-start tracking-tighter">
          Compete habits <br></br> with your <br></br>
          <span className="text-secondary">friends!</span>
        </h1>

        <p className="font-comfortaa text-2xl md:text-3xl text-balance">
          Compete with <span className="text-secondary">friends</span>, create
          or join groups,
          <br />
          and build better habits together. Join us
          <br />
          now and make progress fun!
        </p>
      </section>
      <div className="absolute bottom-10 left-0 right-0 mx-auto flex justify-center items-center">
        <button
          onClick={() => redirect()}
          className="bg-bgSecondary px-6 shadow-lg font-poppins text-tertiary rounded-full w-fit flex flex-row items-center text-xl hover:bg-purple-500 transition-all"
        >
          <img src={rocketIcon} alt="" className="w-[50px]" />
          <span>Launch in the fun!</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
