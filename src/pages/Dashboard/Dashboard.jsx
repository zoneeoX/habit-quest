import React, { useState, useEffect } from "react";
import GroupExplorer from "../../components/GroupExplorer";
import HabitCard from "../../components/HabitCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHabit } from "../../feature/Slices/userHabitSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user_information, isLoading } = useSelector((state) => state.user);
  const { isSuccess } = useSelector((state) => state.complete_habit);
  const { user_habit } = useSelector((state) => state.user_habit);

  useEffect(() => {
    let timeoutId;

    timeoutId = setTimeout(() => {
      dispatch(fetchUserHabit(user_information.email));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [user_information, dispatch, isSuccess]);

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
      <div className="w-screen min-h-screen max-h-full bg-slate-900 text-white px-24 py-48 overflow-hidden grid-background">
        {!isLoading ? (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto">
            <h1 className="font-poppins font-bold text-4xl bg-slate-600/50 p-2 px-6 lg:col-span-3 border-slate-500 border rounded-full w-fit">
              Dashboard
            </h1>
            <GroupExplorer />
            {user_habit?.users_habits?.map(
              (
                { habit_information, timestamp, lastCompletionDate, uuid },
                i
              ) => {
                const {
                  habit_category,
                  habit_name,
                  habit_description,
                  total_habit,
                  exp_habit,
                  level_habit,
                } = habit_information;

                return (
                  <div key={i}>
                    <HabitCard
                      name={habit_name}
                      description={habit_description}
                      category={habit_category}
                      total_habit={total_habit}
                      timestamp={timestamp}
                      lastCompletionDate={lastCompletionDate}
                      uuid={uuid}
                      exp_habit={exp_habit}
                      level_habit={level_habit}
                      dispatch={dispatch}
                    />
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
