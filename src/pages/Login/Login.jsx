import React from "react";
import Icon from "../../assets/icon.png";
import discord from "../../assets/discord.png";
import google from "../../assets/google.png";
import twitter from "../../assets/twitter.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import supabase from "../../database/supabase"

const Login = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      navigate("/success");
    } else {
      navigate("/");
    }
  });

  function navigateToRegister() {
    navigate("/register");
  }
  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 px-24 py-8 overflow-hidden relative flex justify-center items-center font-comfortaa">
      <Navbar />

      <img
        className="absolute w-[40%] -bottom-28 -left-52 rotate-12 opacity-50"
        src={Icon}
      />
      <div className="flex flex-col p-6 relative w-[30rem] h-fit bg-white">
        <div className="flex flex-col justify-center items-center mb-5 relative">
          <div className="relative">
            <img src={Icon} className="w-20 z-10 relative" alt="" />
            <div className="w-20 h-20 bg-bgPrimary absolute inset-0 z-0 blur-2xl rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-sm">Please enter your details to sign in!</p>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
          <button className="border-blue-600 border-[0.5px] px-10 py-1 rounded-lg ">
            <img src={discord} className="w-7" alt="Discord" />
          </button>
          <button className="border-blue-600 border-[0.5px] px-10 py-1 rounded-lg ">
            <img src={google} className="w-7" alt="Google" />
          </button>
          <button className="border-blue-600 border-[0.5px] px-10 py-1 rounded-lg ">
            <img src={twitter} className="w-7" alt="Twitter" />
          </button>
        </div>

        <div className="flex flex-row justify-between items-center relative gap-5 mt-10">
          <div className="bg-black w-full h-[0.5px]" />
          <p>or</p>
          <div className="bg-black w-full h-[0.5px]" />
        </div>

        <div className="flex flex-col gap-6 mt-6 text-sm">
          <input
            type="email"
            className="border border-neutral-400 p-2 rounded-lg"
            placeholder="Enter your email..."
          />
          <input
            type="password"
            className="border border-neutral-400 p-2 rounded-lg"
            placeholder="Enter your password..."
          />
        </div>
        <div className="flex flex-row justify-between items-center my-6 text-sm">
          <div className="flex flex-row gap-2">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <p className="underline">Forgot password?</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button className="bg-black w-full p-3 rounded-xl text-white my-3 font-bold">
            Sign in
          </button>
          <p>
            Don't have an account yet?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => navigateToRegister()}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
