import React, { useState, useEffect } from "react";
import supabase from "../../database/supabase";
import GroupExplorer from "../../components/GroupExplorer";
import HabitCard from "../../components/HabitCard";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [habitData, setHabitData] = useState([]);

  async function getUserData() {
    await supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        setUser(value.data.user);

        getHabits(value.data.user.email);
      }
    });
  }

  async function getHabits(email) {
    try {
      const { data, error } = await supabase
        .from("users_habits")
        .select("*")
        .eq("user", email);

      if (data != null) {
        setHabitData(data[0].users_habits);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  console.log(habitData);

  // const formatEmail = (email) => {
  //   return email?.replace(/@.*/, "");
  // };

  return (
    <>
      <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl col-span-3 bg-blue-700 px-2 rounded-full w-fit">Your habits!</h1>
          <GroupExplorer />
          {habitData?.map(({ habit_information }, i) => {
            const {
              habit_category,
              habit_name,
              habit_description,
              total_habit,
            } = habit_information;

            return (
              <div key={i}>
                <HabitCard
                  name={habit_name}
                  description={habit_description}
                  category={habit_category}
                  total_habit={total_habit}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
