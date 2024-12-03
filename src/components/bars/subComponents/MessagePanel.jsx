import React from 'react'
import { FiMessageCircle } from 'react-icons/fi'

const MessagePanel = () => {
  return (
    <div className="flex items-center p-2 border border-gray-200 rounded-xl bg-white shadow-sm">
      <i className="mr-2">
        <FiMessageCircle size="24" color="#1877F2" />
      </i>
      <div className="hidden md:block">
        <h3 className="m-0 text-base font-medium text-gray-900">Messages</h3>
        <p className="m-0 text-xs text-gray-500">You have 5 new messages</p>
      </div>
    </div>
  )
}

export default MessagePanel
