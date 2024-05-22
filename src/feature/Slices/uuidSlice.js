import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "uuid",
  uuids: [],
};

export const uuidSlice = createSlice({
  name: "uuid",
  initialState,
  reducers: {
    addUuid: (state, action) => {
      state.uuids = action.payload;
    },
  },
});


export const { addUuid } = uuidSlice.actions;
export default uuidSlice.reducer;