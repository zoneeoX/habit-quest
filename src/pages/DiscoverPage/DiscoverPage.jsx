import React, { useEffect, useState } from "react";
import HabitDiscoverCard from "../../components/HabitDiscoverCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHabit } from "../../feature/Slices/allHabitSlice";

//gabung user uuid habits jadi 1 array
//pass in ke discovery page
//compare kalo uuid(gabung) ada yang sama ato kaga
//kalo iya button disable

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const { all_habit } = useSelector((state) => state.all_habit);

  useEffect(() => {
    dispatch(fetchAllHabit());
  }, []);

  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden font-comfortaa">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto mt-10">
        <h1 className="font-poppins font-bold text-4xl bg-blue-700 rounded-full px-4 text-center w-fit lg:col-span-3">
          Discover habit groups!
        </h1>
        {all_habit?.map(({ category, name, description }, i) => (
          <HabitDiscoverCard
            category={category}
            name={name}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
