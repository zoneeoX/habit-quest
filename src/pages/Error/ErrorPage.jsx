import React from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  function redirectToHome() {
    navigate(-1);
  }

  return (
    <section className="w-screen h-screen grid sm:grid-cols-1 md:grid-cols-2 px-24 py-8 place-content-center text-center md:text-start bg-zinc-800 text-white">
      <div className="grid place-items-center md:place-items-start">
        <h1 className="font-poppins font-semibold text-6xl text-balance">
          Oops! <span className="text-secondary">404 ERROR</span> PAGE, someone got lost lol
        </h1>
        <button
          className="bg-primary text-tertiary w-fit rounded-full p-4 text-sm font-comfortaa mt-10 hover:bg-neutral-700 transition-all duration-75 flex flex-row gap-2 items-center"
          onClick={() => {
            redirectToHome();
          }}
        >
          <i className="text-2xl">
            <IoArrowBackCircleOutline />
          </i>
          <span>Maybe click here to go back?</span>
        </button>
      </div>
      <p className="mt-10 font-comfortaa text-2xl text-balance md:text-end">
        An error has occured, maybe something went wrong???, report the error code
      </p>
    </section>
  );
}
