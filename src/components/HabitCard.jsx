import React from "react";

const HabitCard = ({ name, description, category, total_habit }) => {
  return (
    <div>
      <div className="bg-zinc-700 h-[44vh] p-4 border-[0.5px] border-white/50 rounded-xl font-comfortaa">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-poppins font-bold text-2xl">{category}</h1>
            <p className="text-lg">{name}</p>
          </div>
          <div>
            <h1 className="font-poppins font-bold text-xl">{total_habit}</h1>
          </div>
        </div>
        <p className="mt-4 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default HabitCard;
