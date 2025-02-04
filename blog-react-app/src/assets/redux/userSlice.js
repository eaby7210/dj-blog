import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  first_name: "",
  last_name: "",
  email: "",
  pk: null,
  username: "",
  isLoading: false,
  initial: true,
  image: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload, isLoading: false, initial: false };
    },
    userNomad() {
      return { ...initialUser, initial: false };
    },
    userLogout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return { ...initialUser, initial: false };
    },
    setLoading(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
  },
});

export const { setUser, userLogout, userLogin, setLoading, userNomad } =
  userSlice.actions;
export default userSlice.reducer;
