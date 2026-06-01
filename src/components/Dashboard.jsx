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
            <div className="alert alert-warning">No user loaded. Please try logging in again.</div>
          </div>
        </div>
      </div>
    );
  }

  const name = user.name || user.email || user.username || `User ${user?.id ?? ''}`.trim() || 'Not available';
  const email = user.email?.trim() || user.emailAddress?.trim() || user.username?.trim() || 'Not available';
  const createdAt = user.createdAt || user.dateCreated || user.createdDate || null;
  const id = user.id || user._id || 'N/A';

  const formatEmail = (val) => {
    if (!val || typeof val !== 'string') return 'Not available';
    return val.trim() || 'Not available';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      return dateObj.toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="container py-5">
      <div className="dashboard-hero card gradient-card shadow-soft mb-4">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-4 align-items-start">
            <div>
              <span className="badge badge-accent mb-3">Premium Dashboard</span>
              <h1 className="display-6 mb-2">Welcome back, {name}</h1>
              <p className="text-muted mb-0">
                Your account overview and profile information.
              </p>
            </div>
            <div className="dashboard-hero-meta text-end">
              <p className="text-muted mb-1">Member since</p>
              <strong>{formatDate(createdAt)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card glass-card h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 mb-0">Profile Summary</h2>
                <LogoutButton />
              </div>
              <ul className="list-group list-group-flush dashboard-list">
                <li className="list-group-item">
                  <span className="item-label">User ID</span>
                  <span>{id}</span>
                </li>
                <li className="list-group-item">
                  <span className="item-label">Name</span>
                  <span>{name}</span>
                </li>
                <li className="list-group-item">
                  <span className="item-label">Email</span>
                  <span>{formatEmail(email)}</span>
                </li>
                <li className="list-group-item">
                  <span className="item-label">Role</span>
                  <span>{user.role || 'Member'}</span>
                </li>
                <li className="list-group-item">
                  <span className="item-label">Status</span>
                  <span className="badge bg-success">Active</span>
                </li>
                <li className="list-group-item">
                  <span className="item-label">Member Since</span>
                  <span>{formatDate(createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

