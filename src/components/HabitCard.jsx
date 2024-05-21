import React from "react";

const HabitCard = ({ name, description, category }) => {
  return (
    <div>
      <div className="bg-zinc-700 h-[44vh] p-4 border-[0.5px] border-white/50 rounded-xl font-comfortaa">
        <div>
          <h1 className="font-poppins font-bold text-2xl">{category}</h1>
          <p className="text-lg">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
