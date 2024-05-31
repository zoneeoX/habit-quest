import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import {
  createHabitToUser,
  editHabit,
} from "../feature/Slices/createHabitSlice";
import { useNavigate } from "react-router-dom";

const HabitDiscoverCard = ({ uuid, category, name, description, users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_information } = useSelector((state) => state.user);
  const isJoined = users.some(
    (user) => user.user_profile.email === user_information.email
  );

  function joinHabit() {
    const newUser = {
      uuid: uuid,
      timestamp: new Date().toISOString(),
      lastCompletionDate: "",

      habit_information: {
        habit_category: category,
        habit_name: name,
        habit_description: description,
        total_habit: 0,
        exp_habit: 0,
        level_habit: 1,
      },

      user_profile: {
        profile_picture: user_information.user_metadata.profile_picture,
        email: user_information.email,
        username: user_information.user_metadata.username,
      },
    };

    dispatch(
      createHabitToUser({
        user: user_information.email,
        users_habits: newUser,
      })
    );

    dispatch(
      editHabit({
        uuid: uuid,
        newUser: newUser,
      })
    );

    navigate(-1);
  }

  //users.map(({profile_picture, email, username}, i) => ())

  // const test = users.map(({ user_profile }, i) => {
  //   return user_profile.profile_picture;
  // });

  return (
    <div>
      <div className="bg-zinc-700 h-[35vh] p-4 rounded-xl font-comfortaa relative">
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
        <div className="flex flex-row items-center justify-start ">
          {users?.slice(0, 9).map(({ user_profile }, i) => (
            <div key={i} className="-ml-7 relative left-6 hover:left-10 hover:mr-12 transition-all ease-in-out w-fit duration-300">
              <div className="bg-zinc-700 rounded-full mt-2 w-12 h-12 items-center flex justify-center hover:bg-white/50">
                <div className="w-10 h-10 rounded-full relative overflow-hidden ">
                  <img
                    src={user_profile.profile_picture}
                    className="w-full h-full absolute inset-0 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <h2 className="text-lg font-poppins font-semibold">
            Group description
          </h2>
          <p className="text-sm">{description}</p>
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
