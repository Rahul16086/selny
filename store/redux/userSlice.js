import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthLogin: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    setAuthLogout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const { setAuthLogin, setAuthLogout } = userSlice.actions;

export default userSlice.reducer;
