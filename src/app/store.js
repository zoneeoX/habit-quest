import { configureStore } from "@reduxjs/toolkit";
import uuidReducer from "../feature/Slices/uuidSlice";
import userReducer from "../feature/Slices/userSlice";
import userHabitReducer from "../feature/Slices/userHabitSlice";
import allHabitReducer from "../feature/Slices/allHabitSlice"
import createHabitReducer from "../feature/Slices/createHabitSlice"

export const store = configureStore({
  reducer: {
    uuid: uuidReducer,
    user: userReducer,
    user_habit: userHabitReducer,
    all_habit: allHabitReducer,
    create_habit: createHabitReducer
  },
});
