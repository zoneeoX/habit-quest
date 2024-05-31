import React from "react";
import { IoPeopleSharp } from "react-icons/io5";

const Info = ({ uuid, users, description }) => {
  console.log(users);
  return (
    <div className="text-white">
      <div>
        <div className="flex flex-row items-center gap-2 bg-zinc-600 w-fit px-2 rounded-full">
          <i className="text-xl">
            <IoPeopleSharp />
          </i>
          <p className="font-poppins">{users.length}</p>
        </div>
        <div className="flex flex-row">
          {users.map(({ user_profile, habit_information }, i) => (
            <div className="-ml-4 relative left-4 hover:left-7 hover:mr-10 transition-all ease-in-out w-fit duration-300">
              <div className="bg-zinc-700 rounded-full mt-2 w-12 h-12 items-center flex justify-center hover:bg-white/50">
                <div className="w-10 h-10 rounded-full relative overflow-hidden ">
                  <img
                    src={user_profile?.profile_picture}
                    className="w-full h-full absolute inset-0 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h1 className="font-poppins text-lg">Group Description</h1>
          <p className="font-comfortaa text-sm opacity-50">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
