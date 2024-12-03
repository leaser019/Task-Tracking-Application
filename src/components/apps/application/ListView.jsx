import React from 'react'
import ApplicationTable from './ApplicationTable'

const ListView = ({ applications, refetch }) => {
  return (
    <>
      <ApplicationTable applications={applications} refetch={refetch} />
    </>
  )
}

export default ListView
