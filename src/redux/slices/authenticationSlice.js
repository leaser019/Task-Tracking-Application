import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  isSidebarOpen: false,
}
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.user = null
      localStorage.removeItem('userInfo')
    },
    setSlideBarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },
  },
})

export const { setCredentials, logout, setSlideBarOpen, register } =
  authenticationSlice.actions
export default authenticationSlice.reducer
