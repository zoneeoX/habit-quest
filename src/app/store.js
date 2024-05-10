import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../feature/test/testSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});
