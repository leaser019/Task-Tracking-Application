import { useForm } from 'react-hook-form'
import ModalWrapper from '../../common/modal/ModalWrapper'
import { Dialog } from '@headlessui/react'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import {
  useAddActivityMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../../redux/slices/api/applicationApiSlice'
import { toast } from 'sonner'
import React from 'react'
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import { extractApplicationId } from '../../../utils'

const AddSubApplication = ({
  open,
  setOpen,
  id,
  onTaskAdded,
  appDetail,
  setAppDetail,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm()

  const location = useLocation()
  const appId = extractApplicationId(location.pathname)

  const taskStatus = ['To Do', 'In progress', 'Done']

  const [addActivity] = useAddActivityMutation()
  const [addTask] = useAddTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleOnSubmit = async (data) => {
    try {
      if (appDetail) {
        const res = await updateTask({
          body: data,
          app_id: appId,
          task_id: appDetail?._id,
        }).unwrap()
        toast.success('Update Task Successfully!!')
        setAppDetail('')
        setOpen(false)
        onTaskAdded()
        return
      } else {
        const res = await addTask({ body: data, app_id: id }).unwrap()
        toast.success('Create Task Successfully!!')
        setOpen(false)
        onTaskAdded()
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create task')
    }
  }

  React.useEffect(() => {
    if (appDetail) {
      reset({
        title: appDetail?.title || '',
        status: appDetail?.status || '',
        deadline: appDetail?.deadline ? dayjs(appDetail?.deadline) : dayjs(),
        tag: appDetail?.tag || '',
      })
    } else {
      reset({
        title: '',
        status: '',
        deadline: dayjs(),
        tag: '',
      })
    }
    if (open && !id) {
      console.error('Missing application ID')
      setOpen(false)
      toast.error('Missing application ID')
    }
  }, [open, id, setOpen, appDetail, reset])

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <div className="flex flex-row justify-center items-center w-[100%] gap-2 p-6">
            <Grid container spacing={1}>
              <Grid xs={12}>
                <Dialog.Title
                  as="h1"
                  className="bg-white rounded-lg w-[100%] text-2xl font-bold py-4 text-center"
                >
                  {appDetail ? `Update ${appDetail?.title} Task` : 'Add Task'}
                </Dialog.Title>
              </Grid>
              <Grid xs={12} className="my-4">
                <TextField
                  {...register('title', {
                    required: 'Title Is Required',
                  })}
                  id="applicationTitle"
                  name="title"
                  label="Task Title"
                  size="normal"
                  variant="outlined"
                  defaultValue={appDetail?.title}
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} className="mb-4">
                <FormControl fullWidth>
                  <InputLabel id="task-Status">Task Status</InputLabel>
                  <Select
                    labelId="task-status"
                    id="task-status"
                    {...register('status', {
                      required: 'Task Status is required',
                    })}
                    label="Task Status"
                    defaultValue={appDetail?.status}
                  >
                    {taskStatus.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={5} className="mr-4">
                <Controller
                  name="deadline"
                  control={control}
                  defaultValue={
                    appDetail?.deadline ? dayjs(appDetail?.deadline) : dayjs()
                  }
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Deadline Date"
                      defaultValue={
                        appDetail?.deadline
                          ? dayjs(appDetail?.deadline)
                          : dayjs()
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </Grid>
              <Grid xs={6} className="ml-4">
                <TextField
                  {...register('tag', {
                    required: 'Tag Is Required',
                  })}
                  id="tasktag"
                  name="tag"
                  label="Task Tag"
                  size="normal"
                  variant="outlined"
                  defaultValue={appDetail?.tag}
                  fullWidth
                  required
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

export default AddSubApplication
