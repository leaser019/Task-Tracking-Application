import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 selectedUser: null,
 loading: false,
 error: null
};

const userSlice = createSlice({
 name: 'users',
 initialState,
 reducers: {
  setSelectedUser: (state, action) => {
   state.selectedUser = action.payload;
  },
  clearSelectedUser: (state) => {
   state.selectedUser = null;
  },
  setLoading: (state, action) => {
   state.loading = action.payload;
  },
  setError: (state, action) => {
   state.error = action.payload;
   state.loading = false;
  },
  clearError: (state) => {
   state.error = null;
  }
 }
});

export const {
 setSelectedUser,
 clearSelectedUser,
 setLoading,
 setError,
 clearError
} = userSlice.actions;

export default userSlice.reducer;