import { useForm } from 'react-hook-form'
import ModalWrapper from '../../common/modal/ModalWrapper'
import { Dialog } from '@headlessui/react'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'

const AddSubApplication = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  // const [addSbApplication] = useCreateSubApplicationMutation();

  const handleOnSubmit = async (data) => {
    // try {
    //   const res = await addSbApplication({ data, id }).unwrap();
    //   toast.success(res.message);
    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 500);
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err?.data?.message || err.error);
    // }
  }

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
                  ADD TASK
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
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={5} className="mr-4">
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
              <Grid xs={6} className='ml-4'>
                <TextField
                  {...register('tag', {
                    required: 'Tag Is Required',
                  })}
                  id="tasktag"
                  name="tag"
                  label="Task Tag"
                  size="normal"
                  variant="outlined"
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
