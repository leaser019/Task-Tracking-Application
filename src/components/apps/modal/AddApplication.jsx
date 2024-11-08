import ModalWrapper from '../../common/modal/ModalWrapper'
import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import UserList from '../../common/UserList'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import { FormControl } from '@mui/material'
import { FormLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const AddApplication = ({ open, setOpen }) => {
  const taskStage = ['To Do', 'Implement', 'QA/QC', 'Production']
  const priorityLevel = ['Low', 'Normal', 'High']
  var task = ''
  const [team, setTeam] = React.useState(task?.team || [])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })
  const submitHandler = (payload) => {
    console.log(payload)
  }
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className="fullWidth">
          <div className="flex flex-row justify-center items-center w-[100%] gap-2 p-6">
            <Grid container spacing={1}>
              <Grid xs={12}>
                <Dialog.Title
                  as="h1"
                  className="bg-white rounded-lg w-[100%] text-2xl font-bold py-4 text-center"
                >
                  {task ? 'Update Application' : 'Add Application'}
                </Dialog.Title>
              </Grid>
              <Grid xs={12} item className="flex justify-center">
                <img
                  src="./assets/images/application/logoWaiting.gif"
                  alt=""
                  style={{ objectFit: 'cover', width: '45%', height: 'auto' }}
                  className="justify-center items-center"
                />
              </Grid>
              <Grid xs={12} className="my-4">
                <TextField
                  {...register('title', {
                    required: 'Title Is Required',
                  })}
                  id="applicationTitle"
                  name="title"
                  label="Application Title"
                  size="normal"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12}>
                <Controller
                  name="assign"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <UserList {...field} team={team} setTeam={setTeam} />
                  )}
                />
              </Grid>
              <Grid xs={5} className="py-4 mr-8">
                <FormControl fullWidth>
                  <InputLabel id="application-stage">
                    Application Stage
                  </InputLabel>
                  <Select
                    labelId="application-stage"
                    id="application-stage"
                    {...register('stage', {
                      required: 'Application Stage is required',
                    })}
                    label="Application Stage"
                  >
                    {taskStage.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} className="py-4">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Application Date"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </Grid>
              <Grid xs={5} className="py-4 mr-8">
                <FormControl fullWidth>
                  <InputLabel id="priority-level">Priority Level</InputLabel>
                  <Select
                    labelId="priority-level"
                    id="priority-level"
                    {...register('priority', {
                      required: 'Priority Level is required',
                    })}
                    label="Priority Level"
                  >
                    {priorityLevel.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} className="py-2 mt-5">
                <Controller
                  name="assets"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Button
                      component="label"
                      role={undefined}
                      variant="text"
                      tabIndex={-1}
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Assets
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => {
                          const files = Array.from(event.target.files)
                          field.onChange(files)
                        }}
                        multiple
                      />
                    </Button>
                  )}
                />
              </Grid>
              <Grid xs={6}></Grid>
              <Grid container spacing={2} xs={6} className="pt-5">
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    color="error"
                    fullWidth
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </form>
      </ModalWrapper>
    </>
  )
}

export default AddApplication
