import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: [],
  todo: [],
  implement: [],
  testing: [],
  production: [],
  searchResults: {
    application: [],
    todo: [],
    implement: [],
    testing: [],
    production: [],
  },
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllApplication: (state, action) => {
      state.applications = action.payload
    },
    setApplications: (state, action) => {
      const { type, data } = action.payload
      state[type] = data
    },
    setSearchResults: (state, action) => {
      const { type, data } = action.payload
      state.searchResults[type] = data
    },
    createApplication: (state, action) => {
      state.applications.push(action.payload)
    },
    duplicateApplication: (state, action) => {
      state.applications.push(action.payload)
    },
  },
})

export const {
  setAllApplication,
  setApplications,
  setSearchResults,
  createApplication,
  duplicateApplication,
} = applicationSlice.actions

export default applicationSlice.reducer
