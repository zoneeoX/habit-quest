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
      }
    });
  }

  async function getHabits() {
    try {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .limit(10);

      if (data != null) {
        setHabitData(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // async function createHabit() {
  //   try {
  //     const { data, error } = await supabase.from("habits").insert({
  //       name:
  //     });

  //     if (data != null) {
  //       setHabitData(data);
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  useEffect(() => {
    getUserData();
    getHabits();
  }, []);
  console.log(habitData);

  // const formatEmail = (email) => {
  //   return email?.replace(/@.*/, "");
  // };

  //Name
  //Description
  //Category

  return (
    <>
      <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto">
          <GroupExplorer />
          {habitData.map(({ name, description, category }, i) => {
            return (
              <div key={i}>
              <HabitCard
                name={name}
                description={description}
                category={category}
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
