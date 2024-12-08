import React from 'react'
import { useSelector } from 'react-redux'
import { getInitialsUsername } from '../../../utils'
import { genConfig } from 'react-nice-avatar'
import Avatar from 'react-nice-avatar'

const UserInfo = ({ user = '' }) => {
  const mainColor = '#0084ff'
  const { users } = useSelector((state) => state.authentication)
  const config = genConfig({
    id: JSON.stringify(user?.user_name),
    bgColor: { mainColor },
  })

  return (
    <>
      {user ? (
        <div>
          <Avatar className="w-7 h-7 px-1" {...config} />
        </div>
      ) : (
        <div>{getInitialsUsername(users.user_name)}</div>
      )}
    </>
  )
}

export default UserInfo
