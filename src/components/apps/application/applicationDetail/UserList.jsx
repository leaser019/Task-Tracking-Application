import React from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
} from '@mui/material'
import Loading from '../../../common/Loading'
import { useGetAllUsersQuery } from '../../../../redux/slices/api/teamApiSlice'

const UserList = ({ value, onChange, team, setTeam, fullWidth, ...field }) => {
  const { data, isLoading } = useGetAllUsersQuery()
  const [selectUser, setSelectUser] = React.useState(value)

  const handleChange = (event) => {
    const selectedUser = event.target.value
    setSelectUser(selectedUser)
    setTeam([selectedUser]) // Keep array format for consistency
  }

  if (isLoading) {
    return (
      <div className="py-4">
        <Loading />
      </div>
    )
  }

  if (!data) {
    return <div>No users available</div>
  }

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id="user-select-label">Assign To</InputLabel>
      <Select
        labelId="assign-to"
        id="assign-to"
        name="teamMembers"
        fullWidth={fullWidth}
        value={selectUser || ''}
        onChange={handleChange}
        input={<OutlinedInput label="Assign To" />}
        {...field}
      >
        {data.map((user) => (
          <MenuItem key={user.id} value={user}>
            {user.user_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UserList
