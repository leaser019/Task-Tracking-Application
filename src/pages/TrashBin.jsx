import React from 'react'
import Title from '../components/common/Title'
import { Button } from '@mui/material'
import { TiDelete } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import TableHeader from '../components/common/table/TableHeader'
import TableRow from '../components/common/table/TableRow'
import clsx from 'clsx'
import ButtonElement from '../components/common/ButtonElement'
import { useGetAllTrashApplicationQuery } from '../redux/slices/api/applicationApiSlice'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const Trash = () => {
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [action, setAction] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useGetAllTrashApplicationQuery()

  React.useEffect(() => {
    refetch()
  }, [applications, refetch])

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  ) : isError ? (
    <>
      <Error />
    </>
  ) : (
    <>
      <div className="w-full md:px-2 px-0 mb-6">
        <div className="flex item-center justify-between mb-8">
          <Title title="Deleted Application" />
          <ButtonElement
            className={clsx(
              'px-4 py-2 rounded-lg',
              'bg-blue-50/50 text-blue-600',
              'hover:bg-blue-100/80 hover:text-blue-700',
              'backdrop-blur-sm shadow-sm',
              'transition-all duration-300',
              'flex items-center gap-2'
            )}
            label="Refetch"
            type="button"
          />
        </div>
        <div className="overflow-x-auto px-2 py-2">
          <table className="w-full">
            <TableHeader />
            <tbody className="w-full">
              {applications.map((application) => (
                <TableRow
                  key={application?._id}
                  application={application}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Trash
