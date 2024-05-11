import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate("/dashboard");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

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
