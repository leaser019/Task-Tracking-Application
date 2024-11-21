import { apiSlice } from '../apiSlice'

const DASHBOARD_URL = '/app'

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/get-status-statistic`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Dashboard'],
    }),
    getPriorityApp: builder.query({
      query: () => ({
        url: `${DASHBOARD_URL}/get-priority-statistic`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
})

export const { useGetPriorityAppQuery, useGetStatusQuery } = dashboardApiSlice
