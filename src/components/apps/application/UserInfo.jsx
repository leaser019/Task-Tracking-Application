import React from 'react'
import { useSelector } from 'react-redux'
import { getInitialsUsername } from '../../../utils'

const UserInfo = () => {
  const { user } = useSelector((state) => state.authentication)
  console.log(user)
  return (
    <>
      <div>{getInitialsUsername(user.user_name)}</div>
    </>
  )
}

export default UserInfo
