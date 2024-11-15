import { update } from 'react-spring'
import { setCredentials } from '../slices/authenticationSlice'
import { updateUser } from '../slices/userSlice'

export const credentialsTransformer = async (dispatch, queryFulfilled) => {
  try {
    const { data } = await queryFulfilled
    dispatch(setCredentials(data))
    dispatch(updateUser(data))
    return data
  } catch (error) {
    console.error('Credentials update failed:', error)
    throw error
  }
}
