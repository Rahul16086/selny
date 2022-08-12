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
      state.storeAdmin = action.payload.storeAdmin;
    },
    setAuthLogout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.storeadmin = false;
    },
  },
});

export const { setAuthLogin, setAuthLogout } = userSlice.actions;

export default userSlice.reducer;
