import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../database/supabase";

const initialState = {
  name: "user_habit",
  isLoading: false,
  isError: false,
  user_habit: [],
  user_habit_uuids: [],
};

export const fetchUserHabit = createAsyncThunk(
  "habit/fetchUserHabit",
  async (user) => {
    try {
      const response = await supabase
        .from("users_habits")
        .select("*")
        .eq("user", user);

      return response.data[0];
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
  }
);

const userHabitSlice = createSlice({
  name: "user_habit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserHabit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserHabit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user_habit = action.payload;
      
      if (action.payload && action.payload.users_habits) {
        const uuids = action.payload.users_habits.map((habit) => habit.uuid);
        state.user_habit_uuids = uuids;
      }
    });
    builder.addCase(fetchUserHabit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userHabitSlice.reducer;


// async function getHabits(email) {
//     try {
//       const { data, error } = await supabase
//         .from("users_habits")
//         .select("*")
//         .eq("user", email);

//       if (data != null) {
//         setHabitData(data[0]?.users_habits);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   useEffect(() => {
//     if (!isLoading) {
//       getHabits(user_information.email);
//     }
//   }, [isLoading]);
