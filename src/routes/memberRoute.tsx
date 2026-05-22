import { Navigate, Outlet } from 'react-router-dom';
import { isMember } from '@/utils/auth';

const MemberRoute = () => {
  if (!isMember()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default MemberRoute;
