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
//--------------------------------------------

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
      copiedUserHabits[selectedIdx].completionDateArr.push(readableDate);
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

    //---------------------------------
    //for updatealstecompletiondate
    //fetch data dari "habits" table gunain uuid
    //dah dapet terus kita copy users(users_habits) dari "habits" nyya
    //cari dari copied users habits terus find sesuai user_information.email kita
    //dah dapet idx nyna
    //kita manipulate sesuai kebutuhann kita

    try {
      const { data, error } = await supabase
        .from("habits")
        .select()
        .eq("uuid", uuid)
        .single();

      let copiedUserHabits = [...data.users];
      let selectedIdx = copiedUserHabits.findIndex(
        (el) => el.user_profile.email === user
      );
      copiedUserHabits[selectedIdx].lastCompletionDate = readableDate;
      copiedUserHabits[selectedIdx].completionDateArr.push(readableDate);
      copiedUserHabits[selectedIdx].habit_information.total_habit += 1;
      copiedUserHabits[selectedIdx].habit_information.exp_habit += 25;

      if (copiedUserHabits[selectedIdx].habit_information.exp_habit === 100) {
        copiedUserHabits[selectedIdx].habit_information.level_habit += 1;
        copiedUserHabits[selectedIdx].habit_information.exp_habit -= 100;
      }

      await supabase
        .from("habits")
        .update({
          users: copiedUserHabits,
        })
        .eq("uuid", uuid);
    } catch (error) {
      console.log(error);
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
