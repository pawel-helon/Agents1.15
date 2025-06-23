import { useGetThreadsQuery } from 'src/redux/api';

interface ThreadProps {
  userId: string;
  agentId: string;
};

const Thread = (props: ThreadProps) => {
  useGetThreadsQuery({ userId: props.userId, agentId: props.agentId });
  return <div>Thread</div>;
};

export default Thread;