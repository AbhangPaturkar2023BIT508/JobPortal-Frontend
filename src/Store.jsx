import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import ProfileReducer from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    profile: ProfileReducer,
    filter: filterReducer,
  },
});
