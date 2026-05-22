import { Navigate, Outlet } from 'react-router-dom';
import { hasAuth } from '@/utils/auth';

const PrivateRoute = () => {
  if (!hasAuth()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
