import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "This is a test reducer for test env.",
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    test: (state, action) => {
      state.message = "Test completed";
    },
  },
});

export const { test } = testSlice.actions;
export default testSlice.reducer;
