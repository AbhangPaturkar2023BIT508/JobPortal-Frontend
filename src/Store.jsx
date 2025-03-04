import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import ProfileSlice from "./Slices/ProfileSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    profile: ProfileSlice,
  },
});
