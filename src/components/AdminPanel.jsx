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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="h3 mb-1">Admin Panel</h1>
                  <p className="text-muted mb-0">Admin-only controls and details.</p>
                </div>
              </div>

              {user ? (
                <>
                  <div className="mb-4">
                    <h2 className="h5">Welcome admin, {user.name}!</h2>
                    <ul className="list-group list-group-flush mt-3">
                      <li className="list-group-item">
                        <strong>Email:</strong> {user.email}
                      </li>
                      <li className="list-group-item">
                        <strong>Role:</strong> {user.role}
                      </li>
                    </ul>
                  </div>
                  <div className="alert alert-info">
                    <strong>Admin Status:</strong> {adminMessage}
                  </div>
                </>
              ) : (
                <div className="alert alert-warning">No user loaded.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

