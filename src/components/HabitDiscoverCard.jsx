import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { createHabitToUser } from "../feature/Slices/createHabitSlice";
import { useNavigate } from "react-router-dom";

const HabitDiscoverCard = ({ uuid, category, name, description, users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_habit_uuids } = useSelector((state) => state.user_habit);
  const { user_information } = useSelector((state) => state.user);
  const isJoined = user_habit_uuids.includes(uuid);

  function joinHabit() {
    dispatch(
      createHabitToUser({
        user: user_information.email,
        users_habits: users,
      })
    );

    navigate(-1);
    window.location.reload();
  }

  //users.map(({profile_picture, email, username}, i) => ())

  const test = users.map(({ user_profile }, i) => {
    return user_profile.profile_picture;
  });

  return (
    <div>
      <div className="bg-zinc-700/50 h-[35vh] p-4 rounded-xl font-comfortaa relative">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-poppins font-bold text-2xl">{category}</h1>
            <p className="text-lg">{name}</p>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-white opacity-50 my-2" />
        <div className="flex flex-row items-center justify-start gap-2">
          <i className="text-2xl">
            <IoPeopleSharp />
          </i>
          <p>{users.length} Members</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          {users.map(({ user_profile }, i) => (
            <div key={i}>
              <div className="bg-zinc-700/50 rounded-full mt-2 w-9 h-9 items-center flex justify-center">
                <div className="w-7 h-7 rounded-full relative overflow-hidden">
                  <img
                    src={user_profile.profile_picture}
                    className="w-full h-full absolute inset-0 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {!isJoined && (
          <button
            className="flex-row gap-2 absolute bottom-5 right-5 mx-auto flex justify-center items-center bg-blue-700 hover:bg-blue-800 transition w-fit px-4 rounded-full text-lg py-1 font-poppins font-semibold"
            onClick={joinHabit}
          >
            <i>
              <IoMdPersonAdd />
            </i>
            Join now
          </button>
        )}
        {isJoined && (
          <button
            className="flex-row gap-2 absolute bottom-5 right-5 mx-auto flex justify-center items-center bg-slate-700 cursor-not-allowed w-fit px-4 rounded-full text-lg py-1 font-poppins font-semibold"
            disabled
          >
            <i>
              <IoMdPersonAdd />
            </i>
            Joined
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitDiscoverCard;
