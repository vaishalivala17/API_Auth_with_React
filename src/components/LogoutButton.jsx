import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      style={{ marginTop: '20px', padding: '10px 20px' }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

