import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import selectAgentId from 'src/redux/selectors/selectAgentId';
import { RootState } from 'src/redux/store';
import Thread from '../thread';

interface AgentProps {
  userId: string;
};

const Agent = (props: AgentProps) => {
  const { agent: agentName } = useParams();
  const { data } = useSelector((state: RootState) => selectAgentId(state, agentName!))

  if (data === null) return;
  const agentId = data as string;
  
  return (
    <>
      Agent
      <Thread userId={props.userId} agentId={agentId} />
    </>
  )
};

export default Agent;