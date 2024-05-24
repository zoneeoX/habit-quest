import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../database/supabase";

const initialState = {
  name: "all_habit",
  isLoading: false,
  isError: false,
  all_habit: [],
};


export const fetchAllHabit = createAsyncThunk(
  "habit/fetchAllHabit",
  async () => {
    try {
      const response = await supabase.from("habits").select("*");

      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
  }
);

const allHabitSlice = createSlice({
  name: "all_habit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllHabit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllHabit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.all_habit = action.payload;
    });
    builder.addCase(fetchAllHabit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allHabitSlice.reducer;

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
