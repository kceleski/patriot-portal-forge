
import { useSuperUser } from '@/contexts/SuperUserContext';
import { Navigate, Outlet } from 'react-router-dom';

const SuperUserProtectedRoute = () => {
  const { isAuthenticated } = useSuperUser();

  if (!isAuthenticated) {
    return <Navigate to="/super-login" replace />;
  }

  return <Outlet />;
};

export default SuperUserProtectedRoute;
