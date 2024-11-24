import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    getAllApplication: (state, action) => {
      state.applications = action.payload
    },
    createApplication: (state, action) => {
      state.applications.push(action.payload)
    },
    duplicateApplication: (state, action) => {
      state.applications.push(action.payload)
    },
  },
})

export const { getAllApplication, createApplication, duplicateApplication } =
  applicationSlice.actions
export default applicationSlice.reducer
