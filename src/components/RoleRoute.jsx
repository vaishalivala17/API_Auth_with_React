import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../store/authSlice';

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const dispatch = useDispatch();
  const { token, isMeLoading, user } = useSelector((state) => state.auth);
  const hasToken = Boolean(token);

  useEffect(() => {
    if (hasToken && !user && !isMeLoading) {
      dispatch(getMe());
    }
  }, [dispatch, hasToken, user, isMeLoading]);

  if (isMeLoading) return <div>Loading...</div>;
  if (!hasToken) return <Navigate to="/login" replace />;

  const role = user?.role;
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;


