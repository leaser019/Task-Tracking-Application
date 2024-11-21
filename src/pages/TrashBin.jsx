import React from 'react'
import Title from '../components/common/Title'
import { Button } from '@mui/material'
import { TiDelete } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import TableHeader from '../components/common/table/TableHeader'
import { tasks as applications } from '../assets/data'
import TableRow from '../components/common/table/TableRow'
import clsx from 'clsx'
import ButtonElement from '../components/common/ButtonElement'

const Trash = () => {
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [action, setAction] = React.useState(false)
  const [selected, setSelected] = React.useState(null)

  return (
    <>
      <div className="w-full md:px-2 px-0 mb-6">
        <div className="flex item-center justify-between mb-8">
          <Title title="Deleted Application" />
          <div className="button flex flex-row">
            <ButtonElement
              className={clsx(
                'px-4 py-2 rounded-lg',
                'bg-green-50/50 text-green-600',
                'hover:bg-green-100/80 hover:text-green-700',
                'backdrop-blur-sm shadow-sm',
                'transition-all duration-300',
                'flex items-center gap-2'
              )}
              icon={<GrPowerReset size="18" />}
              label="Restore"
              type="button"
            />
            <ButtonElement
              className={clsx(
                'px-4 py-2 rounded-lg',
                'bg-red-50/50 text-red-600',
                'hover:bg-red-100/80 hover:text-red-700',
                'backdrop-blur-sm shadow-sm',
                'transition-all duration-300',
                'flex items-center gap-2'
              )}
              icon={<TiDelete size="18" />}
              label="Delete"
              type="button"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="overflow-x-auto px-2 py-2">
          <table className="w-full">
            <TableHeader />
            <tbody className="w-full">
              {applications.map((application, index) => (
                <TableRow key={index} application={application} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Trash
