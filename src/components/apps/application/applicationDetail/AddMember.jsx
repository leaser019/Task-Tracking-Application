import React from 'react'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Dialog, DialogTitle, DialogContent, Grid, Button } from '@mui/material'
import UserList from './UserList'
import ModalWrapper from '../../../common/modal/ModalWrapper'
import { useAddMemberApplicationMutation } from '../../../../redux/slices/api/applicationApiSlice'
import { toast } from 'sonner'

const AddMember = ({ open, setOpen, appId, refetch }) => {
  const [team, setTeam] = React.useState([])
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [addMember] = useAddMemberApplicationMutation()
  const onSubmit = async (data) => {
    try {
      await addMember({ appId, userId: data?.teamMembers?._id })
      setOpen(false)
      refetch()
      toast.success('Member added successfully')
    } catch (error) {
      toast.error('Failed to add member')
    }
  }
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} className="fullWidth">
        <div className="flex flex-row justify-center items-center w-[100%] gap-2 p-2">
          <Grid container spacing={1}>
            <Grid items xs={12}>
              <DialogTitle>Add Member</DialogTitle>
            </Grid>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid items xs={12}>
                  <Controller
                    name="teamMembers"
                    fullWidth
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <UserList
                        {...field}
                        defaultValue={[]}
                        team={team}
                        setTeam={setTeam}
                        fullWidth
                        {...register('teamMembers')}
                      />
                    )}
                  />
                </Grid>
                <Grid items xs={5}></Grid>
                <Grid items container spacing={2} xs={6} className="pt-5 ml-20">
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
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Grid>
        </div>
      </ModalWrapper>
    </>
  )
}

export default AddMember
