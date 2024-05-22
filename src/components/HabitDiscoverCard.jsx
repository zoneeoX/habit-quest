import React from "react";

const HabitDiscoverCard = ({ category, name, description }) => {
  return (
    <div>
      <div className="bg-zinc-700 h-[40vh] p-4 border-[0.5px] border-white/50 rounded-xl font-comfortaa relative">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-poppins font-bold text-2xl">{category}</h1>
            <p className="text-lg">{name}</p>
          </div>
        </div>
        <button className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center items-center bg-blue-700 w-fit px-4 rounded-full text-lg py-1 font-poppins font-semibold">
          Join now
        </button>
      </div>
    </div>
  );
};

export default HabitDiscoverCard;
