import api from 'src/redux/api';
import { Thread } from 'src/types';

interface Request {
  id: string;
  userId: string;
  agentName: string;
};

interface Response {
  message: string;
  data: Thread | null;
}

const createThread = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Create thread.
     * 
     * @param {Object} body - The request payload
     * @param {string} body.id - Thread id
     * @param {string} body.userId - User id
     * @param {string} body.agentName - Agent name
     * @returns {Object} - Message and data object
    */
    createThread: builder.mutation<Response, Request>({
      query: (body) => {
        return {
          url: '/create-thread',
          method: 'POST',
          body
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        const thread = res.data.data;
        if (!thread) return;
        
        /** Populate getThreads */
        dispatch(api.util.patchQueryData(
          'getThreads',
          { userId: thread.userId, agentId: thread.agentId },
          [
            { op: 'add', path: ['byId'], value: thread },
            { op: 'add', path: ['allIds'], value: thread.id }
          ]
        ));
      }
    }),
  })
})

export const { useCreateThreadMutation } = createThread;

export default createThread;