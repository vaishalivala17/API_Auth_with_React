import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <header className="app-header py-3 shadow-sm">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <NavLink to="/" className="brand-link">
            <span className="brand-text">Auth UI</span>
          </NavLink>
        </div>

        <nav className="d-flex flex-wrap align-items-center gap-2">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="btn btn-outline-light btn-sm">
                Login
              </NavLink>
              <NavLink to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className="btn btn-outline-light btn-sm">
                Dashboard
              </NavLink>
              <NavLink to="/change-password" className="btn btn-outline-light btn-sm">
                Change Password
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="btn btn-outline-light btn-sm">
                  Admin
                </NavLink>
              )}
              <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
