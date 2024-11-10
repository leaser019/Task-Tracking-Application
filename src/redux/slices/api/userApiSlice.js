import { apiSlice } from "../apiSlice"

const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  updateUser: builder.mutation({
   query: (body) => ({
    url: `${USER_URL}/profile`,
    method: "PUT",
    body,
    credentials: "include",
   })
  }),
  changePassword: builder.mutation({
   query: (body) => ({
    url: `${USER_URL}/change-password`,
    method: "PUT",
    body,
    credentials: "include",
   })
  }),
 })
})

export const { useUpdateUserMutation, useChangePasswordMutation } = userApiSlice