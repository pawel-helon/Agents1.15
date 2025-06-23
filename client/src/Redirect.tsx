import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { useCreateThreadMutation } from './redux/actions/createThread';
import tabStorage from './utils/tabStorage';
import { Tab } from './types';

interface RedirectProps {
  userId: string;
}

const Redirect = (props: RedirectProps) => {
  const navigate = useNavigate();
  const { agent: agentName } = useParams();
  const [ createThread ] = useCreateThreadMutation();

  if (!agentName) return;

  const savedTabs: Tab[] = tabStorage.load(agentName);
  if (savedTabs.length > 0) return <Navigate to={`/${agentName}/${savedTabs[0].id}`} />;

  const id = uuidV4();
  createThread({ id, userId: props.userId, agentName: agentName });
  const newTab: Tab = { id, title: 'New chat', isActive: true };
  tabStorage.save(agentName, [newTab]);
  navigate(`/${agentName}/${id}`);
}

export default Redirect;