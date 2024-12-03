import React from 'react'
import TableHeader from '../../common/table/TableHeader'
import TableRow from '../../common/table/TableRow'

const ApplicationTable = ({ applications, refetch }) => {
  const TableHeaderContent = React.useCallback(
    () => (
      <>
        <TableHeader />
      </>
    ),
    []
  )
  const TableRowContent = React.useCallback(
    () => (
      <>
        {applications.map((application) => (
          <TableRow
            key={application?._id}
            application={application}
            show="list-view"
            refetch={refetch}
          />
        ))}
      </>
    ),
    [applications]
  )
  return (
    <>
      <div className="overflow-x-auto px-2 py-2">
        <table className="w-full">
          <TableHeaderContent />
          <tbody className="w-full">
            <TableRowContent />
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ApplicationTable
