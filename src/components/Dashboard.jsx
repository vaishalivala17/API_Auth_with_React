import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../store/authSlice';
import LogoutButton from './LogoutButton';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;


  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
      <LogoutButton />

    </div>
  );
};

export default Dashboard;

