import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    signinFailluer: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    logoutSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    logoutFailluer: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailluer,
  logoutFailluer,
  logoutStart,
  logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
