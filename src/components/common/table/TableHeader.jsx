import React from 'react'

const TableHeader = () => {
  return (
    <thead className="w-full border-b border-gray-300 ">
      <tr className="w-full text-black  text-left ">
        <th className="py-2 line-clamp-1 ">Application Title</th>
        <th className="py-2 text-center pr-6">Priority</th>
        <th className="py-2 line-clamp-1 text-center">Created At</th>
        <th className="py-2 text-center pr-8">Assets</th>
        <th className="py-2">Team</th>
        <th className="py-2 text-center">Actions</th>
      </tr>
    </thead>
  )
}

export default TableHeader
