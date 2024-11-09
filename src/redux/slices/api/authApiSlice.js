import { apiSlice } from "../apiSlice"

const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  login: builder.mutation({
   query: (body) => ({
    url: `${AUTH_URL}/login`,
    method: "POST",
    body,
    credentials: "include",
   })
  })
 })
})

export const { useLoginMutation } = authApiSlice