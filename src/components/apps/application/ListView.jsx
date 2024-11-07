import React from 'react'
import ApplicationTable from './ApplicationTable'

const ListView = ({ applications }) => {
  return (
    <>
      <ApplicationTable applications={applications} />
    </>
  )
}

export default ListView
