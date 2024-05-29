import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../database/supabase";

const initialState = {
  name: "habit_complete",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//cari uuid sesuai di users_habits
//update lastcompletiondate dngn yg baru
export const updateLastCompletionDate = createAsyncThunk(
  "habit/complete",
  async ({ uuid, readableDate, user }) => {
    try {
      const { data, error } = await supabase
        .from("users_habits")
        .select()
        .eq("user", user)
        .single();

      let copiedUserHabits = [...data?.users_habits];
      let selectedIdx = copiedUserHabits.findIndex((el) => el.uuid === uuid);
      copiedUserHabits[selectedIdx].lastCompletionDate = readableDate;
      copiedUserHabits[selectedIdx].habit_information.total_habit += 1;
      copiedUserHabits[selectedIdx].habit_information.exp_habit += 25;

      if (copiedUserHabits[selectedIdx].habit_information.exp_habit === 100) {
        copiedUserHabits[selectedIdx].habit_information.level_habit += 1;
        copiedUserHabits[selectedIdx].habit_information.exp_habit -= 100;
      }

      await supabase
        .from("users_habits")
        .update({
          users_habits: copiedUserHabits,
        })
        .eq("user", user);
    } catch (error) {
      console.error(error);
    }
  }
);

const completeHabitSlice = createSlice({
  name: "habit/complete",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(updateLastCompletionDate.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateLastCompletionDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateLastCompletionDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      }),
});

export default completeHabitSlice.reducer;
