import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: [],
  todo: [],
  implement: [],
  testing: [],
  production: [],
  searchResults: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    getAllResults: (state, action) => {
      state.applications = action.payload
    },
    setAllApplication: (state, action) => {
      state.applications = action.payload
    },
    setApplications: (state, action) => {
      const { type, data } = action.payload
      state[type] = data
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
    createApplication: (state, action) => {
      state.applications.push(action.payload)
    },
    duplicateApplication: (state, action) => {
      state.applications.push(action.payload)
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
  },
})

export const {
  setAllApplication,
  getAllResults,
  setApplications,
  setSearchResults,
  createApplication,
  duplicateApplication,
  clearSearchResults,
} = applicationSlice.actions

export default applicationSlice.reducer
