import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import ProfileReducer from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
import sortReducer from "./Slices/SortSlice";
import jwtReducer from "./Slices/JwtSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    profile: ProfileReducer,
    filter: filterReducer,
    sort: sortReducer,
    jwt: jwtReducer,
  },
});
