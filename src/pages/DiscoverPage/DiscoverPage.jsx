import React, { useEffect, useState } from "react";
import supabase from "../../database/supabase";
import HabitDiscoverCard from "../../components/HabitDiscoverCard";

//gabung user uuid habits jadi 1 array
//pass in ke discovery page
//compare kalo uuid(gabung) ada yang sama ato kaga
//kalo iya button disable

const DiscoverPage = () => {
  const [habit, setHabit] = useState([]);


  async function fetchAllHabits() {
    try {
      const { data, error } = await supabase.from("habits").select("*");

      if (data !== null) {
        setHabit(data);
      }

      if (error) {
        console.log("Error, something mustve happened!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(habit);

  useEffect(() => {
    fetchAllHabits();
  }, []);

  return (
    <div className="w-screen min-h-screen max-h-full bg-zinc-800 text-white px-24 py-48 overflow-hidden font-comfortaa">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem] max-w-6xl mx-auto mt-10">
        <h1 className="font-poppins font-bold text-4xl col-span-3 bg-blue-700 w-fit rounded-full px-2">
          Discover habit groups!
        </h1>
        {habit?.map(({ category, name, description }, i) => (
          <HabitDiscoverCard
            category={category}
            name={name}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
