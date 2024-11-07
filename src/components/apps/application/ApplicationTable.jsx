import React from 'react'
import TableHeader from '../../common/table/TableHeader'
import TableRow from '../../common/table/TableRow'

const ApplicationTable = ({ applications }) => {
  return (
    <>
      <div className="overflow-x-auto px-2 py-2">
        <table className="w-full">
          <TableHeader />
          <tbody className="w-full">
            {applications.map((application, index) => (
              <TableRow
                key={index}
                application={application}
                show="list-view"
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ApplicationTable
