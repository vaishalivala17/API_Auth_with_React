import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [adminMessage, setAdminMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get('/admin');
        setAdminMessage(response.data?.msg || 'Admin access verified');
      } catch (err) {
        setAdminMessage('Failed to fetch admin data');
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>Admin Panel</h1>
      {user ? (
        <div>
          <h2>Welcome admin, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <hr />
          <p><strong>Admin Status:</strong> {adminMessage}</p>
        </div>
      ) : (
        <p>No user loaded.</p>
      )}
    </div>
  );
};

export default AdminPanel;

