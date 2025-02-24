import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const UserSlice = createSlice({
  name: "user",
  initialState: getItem("user"),
  reducers: {
    setUser: (state, action) => {
      setItem("user", action.payload);
      state = getItem("user");
      return state;
    },
    removeUser: (state) => {
      removeItem("user");
      state = null;
      return state;
    },
  },
});

// const UserSlice = createSlice({
//   name: "user",
//   initialState: getItem("user") || {}, // Ensure initial state is always defined
//   reducers: {
//     setUser: (state, action) => {
//       setItem("user", action.payload);
//       return action.payload; // Directly return new user data
//     },
//     removeUser: () => {
//       removeItem("user");
//       return {}; // Return an empty object instead of 'null'
//     },
//   },
// });

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
