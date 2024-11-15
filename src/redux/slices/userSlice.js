import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser:
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')),
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      if (state.selectedUser) {
        state.selectedUser = { ...state.selectedUser, ...action.payload }

        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo', JSON.stringify(state.selectedUser))
      }
    },
    changePassword: (state, action) => {
      if (state.selectedUser) {
        state.selectedUser = { ...state.selectedUser, ...action.payload }
        localStorage.setItem('userInfo', JSON.stringify(state.selectedUser))
      }
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  updateUser,
  changePassword,
  clearSelectedUser,
  setLoading,
  setError,
  clearError,
} = userSlice.actions

export default userSlice.reducer
