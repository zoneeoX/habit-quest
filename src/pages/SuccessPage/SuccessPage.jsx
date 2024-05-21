import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  clearInterval,
  setInterval,
  setTimeout,
  clearTimeout,
} from "worker-timers";

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
        navigate("/dashboard");
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="bg-zinc-800 flex justify-center items-center text-7xl text-white font-poppins font-semibold w-screen h-screen flex-col">
      <p className="text-green-600">Success</p>
      <p className="text-white text-sm font-comfortaa">
        Redirecting to dashboard in {countdown} seconds...
      </p>
    </div>
  );
};

export default SuccessPage;
