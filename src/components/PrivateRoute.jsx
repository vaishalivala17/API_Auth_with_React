import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const hasToken = Boolean(token);

  return hasToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;


