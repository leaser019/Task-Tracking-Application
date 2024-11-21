import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: null,
  priority_status: null,
  trash_app: null,
}
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    getStatus: (state, action) => {
      state.status = action.payload
    },
    getPriorityStatus: (state, action) => {
      state.priority_status = action.payload
    },
    getTrashApp: (state, action) => {
      state.trash_app = action.payload
    },
    getUserNumber: (state, action) => {
      state.user_number = action.payload
    },
  },
})

export const { getStatus, getPriorityStatus } = dashboardSlice.actions
export default dashboardSlice.reducer
