import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const base_url_api = process.env.REACT_APP_BACKEND_API_URL
const base_query = fetchBaseQuery({ baseUrl: base_url_api })

export const apiSlice = createApi({
  baseQuery: base_query,
  endpoints: (builder) => ({}),
})
