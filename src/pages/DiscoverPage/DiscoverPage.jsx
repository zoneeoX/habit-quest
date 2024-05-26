import React, { useEffect, useState } from "react";
import HabitDiscoverCard from "../../components/HabitDiscoverCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHabit } from "../../feature/Slices/allHabitSlice";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

//gabung user uuid habits jadi 1 array
//pass in ke discovery page
//compare kalo uuid(gabung) ada yang sama ato kaga
//kalo iya button disable

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { all_habit } = useSelector((state) => state.all_habit);

  useEffect(() => {
    dispatch(fetchAllHabit());
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden font-comfortaa">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto mt-10">
        <div className="lg:col-span-3 bg-blue-700 w-full rounded-full p-2">
          <div className="flex flex-row items-center px-4">
            <h1
              className="font-poppins cursor-pointer text-4xl font-bold bg-blue-500 text-white p-2 rounded-full"
              onClick={goBack}
            >
              <i>
                <IoIosArrowBack />
              </i>
            </h1>
            <h1 className="font-poppins font-bold text-4xl rounded-full px-4">
              Discover habit groups!
            </h1>
          </div>
        </div>
        {all_habit?.map(({ uuid, category, name, description, users }, i) => (
          <HabitDiscoverCard
            key={i}
            category={category}
            name={name}
            description={description}
            uuid={uuid}
            users={users}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
