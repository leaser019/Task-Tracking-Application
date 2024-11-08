import React from 'react'
import Title from './../components/common/Title'

const Team = () => {
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [action, setAction] = React.useState(false)
  const [selected, setSelected] = React.useState(null)
  return (
    <>
      <div className="w-full md:px-2 px-0 mb-6">
        <div className="flex item-center justify-between mb-8">
          <Title title="Teams" />
        </div>
      </div>
    </>
  )
}

export default Team
