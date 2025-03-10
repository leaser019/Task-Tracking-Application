import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import authReducer from './slices/authenticationSlice'
import userReducer from './slices/userSlice'
import teamReducer from './slices/teamSlice'
import dashboardReducer from './slices/dashboardSlice'
import applicationReducer from './slices/applicationSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authentication: authReducer,
    users: userReducer,
    team: teamReducer,
    dashboard: dashboardReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
