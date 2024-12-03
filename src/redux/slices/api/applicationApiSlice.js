import { get } from 'react-hook-form'
import { apiSlice } from '../apiSlice'

const APPLICATION_URL = '/app'

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplication: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllTodo: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all-todo`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllImplement: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all-implement`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllTesting: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all-testing`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getAllProduction: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-all-production`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    searchApplication: builder.query({
      query: (search) => ({
        url: `${APPLICATION_URL}/search-app/${search}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    searchToDoApplication: builder.query({
      query: (search) => ({
        url: `${APPLICATION_URL}/search-todo-app/${search}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    searchImplementApplication: builder.query({
      query: (search) => ({
        url: `${APPLICATION_URL}/search-implement-app/${search}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    searchTestingApplication: builder.query({
      query: (search) => ({
        url: `${APPLICATION_URL}/search-testing-app/${search}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    searchProductionApplication: builder.query({
      query: (search) => ({
        url: `${APPLICATION_URL}/search-production-app/${search}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    createApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/add-new`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    duplicateApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/duplicate/${body}`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    makeTrashApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/trash/${body}`,
        method: 'PUT',
        body,
        credentials: 'include',
      }),
    }),
    getAllTrashApplication: builder.query({
      query: () => ({
        url: `${APPLICATION_URL}/get-trashed-app`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    restoreTrashApplication: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/restore/${body}`,
        method: 'PUT',
        body,
        credentials: 'include',
      }),
    }),
    deleteApplicationForReal: builder.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/delete/${body}`,
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      //   onQueryStarted: (body, { dispatch, queryFulfilled }) => {
      //     dispatch(deleteApplication(body))
      //   },
    }),
  }),
})

export const {
  useGetAllApplicationQuery,
  useCreateApplicationMutation,
  useDuplicateApplicationMutation,
  useGetAllTodoQuery,
  useGetAllImplementQuery,
  useGetAllTestingQuery,
  useGetAllProductionQuery,
  useSearchApplicationQuery,
  useSearchToDoApplicationQuery,
  useSearchImplementApplicationQuery,
  useSearchTestingApplicationQuery,
  useSearchProductionApplicationQuery,
  useMakeTrashApplicationMutation,
  useGetAllTrashApplicationQuery,
  useRestoreTrashApplicationMutation,
  useDeleteApplicationForRealMutation,
} = applicationApiSlice
