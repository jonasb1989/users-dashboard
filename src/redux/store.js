import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "redux/users";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
