import React from 'react'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { summary } from '../../assets/data'
import { OutlinedInput } from '@mui/material'
import { FormControl } from '@mui/material'
import { FormLabel } from '@mui/material'

const UserList = ({ value, onChange, team, setTeam }) => {
  const data = summary.users
  const [selectUser, setSelectUser] = React.useState(value)
  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectUser(typeof value === 'string' ? value.split(',') : value)
    setTeam((prev) => [value])
    onChange(value)
  }
  return (
    <>
      <FormControl fullWidth>
        <FormLabel>
          <InputLabel id="team-label">Assign</InputLabel>
        </FormLabel>
        <Select
          input={<OutlinedInput label="Team" />}
          labelId="team-label"
          id="team"
          multiple
          value={selectUser}
          label="Assign"
          require
          onChange={handleChange}
          fullWidth
        >
          {data.map((user) => (
            <MenuItem key={user?._id} value={user}>
              {user?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default UserList
