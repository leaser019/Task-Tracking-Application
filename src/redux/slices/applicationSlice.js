import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  application: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    getAllApplication: (state, action) => {
      state.application = action.payload
    },
  },
})
