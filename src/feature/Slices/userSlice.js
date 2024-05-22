import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../database/supabase";

const initialState = {
  name: "user_information",
  isLoading: false,
  isError: false,
  user_information: [],
};

// useEffect(() => {
//     async function getUserData() {
//       await supabase.auth.getUser().then((value) => {
//         if (value.data?.user) {
//           setUser(value.data.user);
//         }
//       });
//     }

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await supabase.auth.getUser()
    return response.data.user
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user_information",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user_information = action.payload;
      state.isError = false;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user_information = [];
      state.isError = action.error.message;
    });
  },
});

export default userSlice.reducer;
