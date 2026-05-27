import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../store/authSlice';
import LogoutButton from './LogoutButton';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isMeLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (isMeLoading) {
    return <div className="text-center py-5 text-muted">Loading your details...</div>;
  }

  if (!user) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="alert alert-warning">
              No user loaded. Please try logging in again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const name = user.name || user?.name || `User ${user?.id ?? ''}`.trim() || 'Not available';
  const email = user.email || user?.email || 'Not available';
  const createdAt = user.createdAt || user?.createdAt || null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 className="h3 mb-1">Dashboard</h1>
                  <p className="text-muted mb-0">Welcome to your account overview.</p>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="h5 mb-3">Profile</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Name:</strong> {name}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {email}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong> {user.role}
                  </li>
                  <li className="list-group-item">
                    <strong>Joined:</strong>{' '}
                    {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}
                  </li>
                </ul>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded h-100">
                    <h3 className="h6">Quick actions</h3>
                    <p className="text-muted mb-2">
                      These are placeholders—connect them to your backend/admin routes.
                    </p>
                    <ul className="mb-0">
                      <li>View settings</li>
                      <li>Update profile</li>
                      <li>Change password</li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded h-100">
                    <h3 className="h6">Status</h3>
                    <p className="mb-1">
                      <strong>Authentication:</strong>{' '}
                      {user ? 'Active' : 'Unknown'}
                    </p>
                    <p className="text-muted mb-0">
                      User details loaded from <code>/user</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

