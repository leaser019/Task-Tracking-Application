import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teams: [],
}
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      state.teams = action.payload
    },
    deleteUser: (state, action) => {
      state.teams = state.teams.filter(
        (team) => team.user_name !== action.payload
      )
    },
    activeAccount: (state, action) => {
      state.teams = state.teams.map((team) =>
        team.user_name === action.payload
          ? { ...team, active: !team.active }
          : team
      )
    },
    addTeam: (state, action) => {
      state.teams.push(action.payload)
    },
    removeTeam: (state, action) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload)
    },
    updateUsers: (state, action) => {
      state.teams = state.teams.map((team) =>
        team.id === action.payload.id ? action.payload : team
      )
    },
  },
})

export const {
  getAllUsers,
  deleteUser,
  activeAccount,
  addTeam,
  removeTeam,
  updateUsers,
} = teamSlice.actions

export default teamSlice.reducer
