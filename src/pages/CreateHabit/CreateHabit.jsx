import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import supabase from "../../database/supabase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateHabit = () => {
  const navigate = useNavigate();

  const [habit, setHabit] = useState({
    category: "",
    name: "",
    description: "",
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }

    getUserData();
  }, []);

  async function createHabitsToUser(user, users_habits) {
    //reference
    //user ny itu user.email dibawah
    //users_habits param itu the fkin user habits

    const { data, error } = await supabase
      .from("users_habits")
      .select()
      .eq("user", user);

    if (data.length === 0) {
      try {
        await supabase
          .from("users_habits")
          .insert({
            user: user,
            users_habits: users_habits,
          })
          .single();
      } catch (error) {
        console.error(error);
      }
    } else {
      let currentUserHabits = data[0]?.users_habits;
      let mergedUserHabits = [...users_habits, ...currentUserHabits];

      try {
        await supabase
          .from("users_habits")
          .update({ users_habits: mergedUserHabits })
          .eq("user", user);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function createHabit() {
    let usersArray = [];

    try {
      const newUser = {
        uuid: uuidv4(),
        timestamp: new Date().toISOString(),

        habit_information: {
          habit_category: habit.category,
          habit_name: habit.name,
          habit_description: habit.description,
          total_habit: 0,
        },

        user_information: {
          profile_picture: user.user_metadata.profile_picture,
          email: user.email,
          username: user.user_metadata.username,
        },
      };

      if (Array.isArray(habit.users)) {
        usersArray = [...habit.users, newUser];
      } else {
        if (habit.users) {
          usersArray.push(habit.users);
        }
        usersArray.push(newUser);
      }

      await supabase
        .from("habits")
        .insert({
          category: habit.category,
          name: habit.name,
          description: habit.description,
          users: usersArray,
        })
        .single();

      createHabitsToUser(user.email, usersArray);

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-zinc-800 w-screen min-h-fit max-h-full py-48 px-24 font-comfortaa text-white relative">
        <div className="flex flex-row justify-between h-[70vh] gap-6">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-poppins font-bold text-4xl">
                Thank you for using Habit Quest
              </h1>
              <p className="text-balance">
                Congratulations on taking the first step towards building a
                better habit!.
              </p>
            </div>
            <div className="bg-zinc-700 p-4 rounded-xl border-white/50 border-[0.5px]">
              <h2 className="font-poppins text-2xl font-bold">
                Visit my github!
              </h2>
              <p className="text-sm">Don't forget to star my project~</p>
              <button className="bg-blue-700 p-2 font-bold rounded-lg mt-6">
                Visit github.
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  className="bg-zinc-700 px-4 py-2 rounded-lg w-96"
                  value={habit.category}
                  onChange={(e) =>
                    setHabit({ ...habit, category: e.target.value })
                  }
                  placeholder="Select a category"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="bg-zinc-700 px-4 py-2 rounded-lg w-96"
                  placeholder="Select a name"
                  value={habit.name}
                  onChange={(e) => setHabit({ ...habit, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Description</label>
                <textarea
                  type="text"
                  style={{ resize: "none" }}
                  rows={7}
                  className="bg-zinc-700 px-4 py-2 rounded-lg w-96"
                  placeholder="Select a description"
                  value={habit.description}
                  onChange={(e) =>
                    setHabit({ ...habit, description: e.target.value })
                  }
                />
              </div>
              {/* <div className="flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="Visibility">Visibility</label>
                  <select
                    id="visibility"
                    className="bg-zinc-700 px-2 py-2 w-96"
                    defaultValue="private"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div> */}
            </div>

            <button
              className="bg-blue-700 p-2 font-poppins font-bold rounded-lg"
              onClick={createHabit}
            >
              Create habit!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHabit;
