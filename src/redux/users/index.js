import { createSlice } from "@reduxjs/toolkit";

export const usersReducer = createSlice({
  name: "user",
  initialState: {
    value: [],
    lastIndex: 0,
  },
  reducers: {
    addUsers: (state, action) => {
      state.value = action.payload;
      state.lastIndex = action.payload[action.payload.length - 1].id;
    },

    addUser: (state, action) => {
      state.value = [
        ...state.value,
        { id: state.lastIndex + 1, ...action.payload },
      ];
      state.lastIndex = state.lastIndex + 1;
    },

    editUser: (state, action) => {
      const editedUsers = state.value.reduce((acc, user) => {
        if (user.id === action.payload.id) {
          console.log("USER_teste", user.id);
          return [...acc, action.payload];
        }
        console.log("USER_teste", user.name);
        return [...acc, { ...user }];
      }, []);
      state.value = editedUsers;
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUsers, addUser, editUser, deleteUser } = usersReducer.actions;

export default usersReducer.reducer;
