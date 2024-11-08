import React from 'react'
import Title from '../components/common/Title'
import { Button } from '@mui/material'
import { TiDelete } from 'react-icons/ti'
import { GrPowerReset } from 'react-icons/gr'
import TableHeader from '../components/common/table/TableHeader'
import { tasks as applications } from '../assets/data'
import TableRow from '../components/common/table/TableRow'

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
          <div className="button">
            <Button variant="text" color="info" endIcon={<GrPowerReset />}>
              Restore All
            </Button>
            <Button variant="text" color="error" endIcon={<TiDelete />}>
              Delete All
            </Button>
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
