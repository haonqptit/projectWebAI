import { useParams } from 'react-router-dom';
import Member1 from './Member1';
import Member2 from './Member2';
import Member3 from './Member3';

const MemberDetail = () => {
  const { id } = useParams();

  if (id === '1') {
    return <Member1 />;
  }
  if (id === '2') {
    return <Member2 />;
  }
  if (id === '3') {
    return <Member3 />;
  }

  // Fallback for safety, rendering Member1
  return <Member1 />;
};

export default MemberDetail;
