import React, { useEffect, useState } from "react";
import HabitDiscoverCard from "../../components/HabitDiscoverCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHabit } from "../../feature/Slices/allHabitSlice";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
    <>
      <style jsx>{`
        .grid-background {
          background-image: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <div className="grid-background w-screen min-h-screen max-h-full bg-slate-900 text-white py-48 overflow-hidden font-comfortaa">
        
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto mt-10 bg-slate-800/50 backdrop-blur-sm p-10 rounded-xl border border-neutral-100/50">
          <div className="lg:col-span-3 bg-slate-900 border-slate-500/50 border w-full rounded-full p-2">
            <div className="flex flex-row items-center px-4">
              <h1
                className="font-poppins cursor-pointer text-4xl font-bold bg-slate-800 hover:bg-slate-700 transition border border-slate-500/50 text-white p-2 rounded-full"
                onClick={goBack}
              >
                <i>
                  <IoIosArrowBack />
                </i>
              </h1>
              <h1 className="font-poppins font-bold text-lg lg:text-4xl rounded-full px-4">
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
    </>
  );
};

export default DiscoverPage;
