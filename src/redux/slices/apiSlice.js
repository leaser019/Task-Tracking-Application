import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const base_url_api = 'https://example.com/api' // Provide a valid base URL
const base_query = fetchBaseQuery({ baseUrl: base_url_api })

export const apiSlice = createApi({
 baseQuery: base_query,
 endpoints: (builder) => ({})
})