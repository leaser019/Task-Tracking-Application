import React from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
} from '@mui/material'
import Loading from './Loading'
import { useGetAllUsersQuery } from '../../redux/slices/api/teamApiSlice'

const UserList = ({ value, onChange, team, setTeam, fullWidth }) => {
  const { data, isLoading } = useGetAllUsersQuery()
  const [selectUser, setSelectUser] = React.useState(value)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectUser(typeof value === 'string' ? value.split(',') : value)
    setTeam((prev) => [value])
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
        name="assign"
        fullWidth={fullWidth}
        multiple
        value={selectUser}
        onChange={handleChange}
        input={<OutlinedInput label="Assign To" />}
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
