import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'

const NotificationPanel = () => {
  return (
    <div className="flex items-center p-2 border border-gray-200 rounded-full bg-white shadow-sm ml-3">
      <i className="mr-2">
        <IoNotificationsOutline size="24" color="#1877F2" />
      </i>
      <div className="hidden md:block">
        <h3 className="m-0 text-base font-medium text-gray-900">
          Notifications
        </h3>
        <p className="m-0 text-xs text-gray-500">
          You have 3 new notifications
        </p>
      </div>
    </div>
  )
}

export default NotificationPanel
