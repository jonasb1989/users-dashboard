import { createSlice } from "@reduxjs/toolkit";

export const usersReducer = createSlice({
  name: "user",
  initialState: {
    value: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.value = action.payload;
    },

    addUser: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUsers, addUser, deleteUser } = usersReducer.actions;

export default usersReducer.reducer;
