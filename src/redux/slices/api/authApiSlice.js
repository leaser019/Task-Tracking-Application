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
  }),
  logout: builder.mutation({
   query: () => ({
    url: `${AUTH_URL}/logout`,
    method: "POST",
    credentials: "include",
   })
  }),
  register: builder.mutation({
   query: (body) => ({
    url: `${AUTH_URL}/register`,
    method: "POST",
    body,
    credentials: "include",
   })
  })
 })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice