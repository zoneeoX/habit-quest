import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../database/supabase";

const initialState = {
  name: "create_habit",
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const createHabitToUser = createAsyncThunk(
  "habit/create_user",
  async ({ user, users_habits }) => {
    console.log("habit/create_user : ", user, users_habits);

    try {
      const { data, error } = await supabase
        .from("users_habits")
        .select()
        .eq("user", user);

      if (data.length === 0) {
        await supabase
          .from("users_habits")
          .insert({
            user: user,
            users_habits: users_habits,
          })
          .single();
      } else {
        let currentUserHabits = data[0]?.users_habits;
        let mergedUserHabits = [...users_habits, ...currentUserHabits];

        await supabase
          .from("users_habits")
          .update({ users_habits: mergedUserHabits })
          .eq("user", user);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const createHabit = createAsyncThunk(
  "habit/create_all",
  async ({ habit, usersArray, uuid }) => {
    try {
      await supabase
        .from("habits")
        .insert({
          uuid: uuid,
          category: habit.category,
          name: habit.name,
          description: habit.description,
          users: usersArray,
        })
        .single();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const createHabitSlice = createSlice({
  name: "create_habit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createHabit.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createHabit.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(createHabitToUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createHabitToUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createHabitToUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export default createHabitSlice.reducer;
