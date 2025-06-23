import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NormalizedAgents, NormalizedThreads } from 'src/types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getAgents: builder.query<NormalizedAgents | null, { userId: string }>({
      query: (body) => {
        return {
          url: '/get-agents',
          method: 'POST',
          body
        }
      },
      transformResponse: (response: { message: string; data: NormalizedAgents | null}) => {
        return response.data;
      },
    }),
    getThreads: builder.query<NormalizedThreads | null, { userId: string, agentId: string }>({
      query: (body) => {
        return {
          url: '/initialize-threads',
          method: 'POST',
          body
        }
      },
      transformResponse: (response: { message: string; data: NormalizedThreads | null}) => {
        return response.data;
      },
    }),
  })
});

export const {
  useGetAgentsQuery,
  useGetThreadsQuery,
} = api;

export default api;