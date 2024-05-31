import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLastCompletionDate } from "../feature/Slices/completeHabitSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const HabitCard = ({
  name,
  description,
  category,
  total_habit,
  timestamp,
  lastCompletionDate,
  uuid,
  exp_habit,
  level_habit,
  dispatch,
}) => {
  const { user_information } = useSelector((state) => state.user);

  const [remainingHours, setRemainingHours] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const weeklyHabits = Array.from({ length: 7 }, () => false);

  useEffect(() => {
    detectIsCompleted();
  }, [lastCompletionDate]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const timeDiff = Math.abs(now - past);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "...";
    }
  };

  const detectIsCompleted = () => {
    if (!lastCompletionDate) {
      setIsComplete(false);
      setRemainingHours(null);
      return;
    }

    const lastCompletion = new Date(lastCompletionDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastCompletion.getTime();
    const differenceInHours = timeDifference / (1000 * 3600);

    setRemainingHours(24);

    if (differenceInHours < 24) {
      setIsComplete(true);
      const remainingHours = 24 - differenceInHours;
      setRemainingHours(remainingHours);
    } else {
      setIsComplete(false);
      setRemainingHours(null);
    }
  };

  const completeHabit = async () => {
    const currentDate = new Date();
    const readableDate = currentDate.toISOString();

    setIsLoading(true);

    await dispatch(
      updateLastCompletionDate({
        uuid,
        readableDate,
        user: user_information.email,
      })
    );

    setIsLoading(false);
  };

  return (
    <div>
      <div className="bg-zinc-700 min-h-[44vh] p-4 rounded-xl font-comfortaa flex flex-col justify-between">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-between truncate">
            <p className="text-2xl font-poppins font-semibold w-[18ch]">
              {name}
            </p>
            <p>{getTimeAgo(lastCompletionDate)}</p>
          </div>
        </div>

        <div className="mt-4 bg-zinc-600 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg">Habit Weekly (progress)</h1>
            <div className="flex flex-row gap-2">
              {weeklyHabits.map((item, i) => (
                <div className="bg-white w-3 h-3" key={i} />
              ))}
            </div>
            <div className="mt-4">
              <h1 className="text-lg">
                Habit xp (progress){" "}
                <span className="text-sm opacity-50">
                  next lvl is {level_habit + 1}.
                </span>
              </h1>
              <div className="bg-white h-3 w-full relative rounded-full">
                <div
                  className={`h-full bg-green-500 rounded-full ease-in-out transition-all`}
                  style={{ width: `${exp_habit > 0 ? exp_habit : 0}%` }}
                ></div>{" "}
              </div>
            </div>
            <div className="mt-10 text-center">
              <h1 className="text-lg">Habit level (progress)</h1>
              <div className="bg-zinc-500 w-10 h-10 items-center flex justify-center rounded-full mx-auto mt-4">
                <h1 className="font-poppins font-semibold text-xl text-center">
                  {level_habit}
                </h1>
              </div>
            </div>
          </div>
        </div>
        {isComplete ? (
          <div className="text-center mt-2">
            <button
              className="bg-green-700 rounded-lg font-poppins p-1 cursor-not-allowed w-full flex flex-col justify-center items-center"
              disabled
            >
              Habit Completed
              <span className="text-sm opacity-50">
                you can complete this again in {remainingHours?.toFixed(0)} hrs
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={completeHabit}
            className="bg-blue-700 rounded-lg font-poppins p-1 mt-2 flex flex-col justify-center items-center hover:bg-blue-600 transition"
          >
            {!isLoading ? (
              "Complete Habit"
            ) : (
              <i className="animate-spin">
                <AiOutlineLoading3Quarters />
              </i>
            )}
            <span className="text-sm opacity-50">25+ xp</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
