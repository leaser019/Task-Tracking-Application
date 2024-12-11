import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  applications: [],
  todo: [],
  implement: [],
  testing: [],
  production: [],
  trash: [],
  searchResults: [],
  task: [],
  activities: [],
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
    deleteApplication: (state, action) => {
      state.applications = state.applications.filter(
        (app) => app._id !== action.payload
      )
    },
    addTask: (state, action) => {
      state.task.push(action.payload)
    },
    getTask: (state, action) => {
      state.task = action.payload
    },
    addActivities: (state, action) => {
      state.activities.push(action.payload)
    },
    getActivities: (state, action) => {
      state.activities = action.payload
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
  deleteApplication,
  addTask,
  getTask,
  addActivities,
  getActivities,
} = applicationSlice.actions

export default applicationSlice.reducer
