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
    <header className="app-header">
      <div className="container header-inner d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
          <NavLink to="/" className="brand-link">
            <span className="brand-title">Auth UI</span>
          {isAuthenticated && (
            <div className="header-greeting text-white">
              Signed in as <strong>{user?.name || user?.email || 'Member'}</strong>
            </div>
          )}
          </NavLink>
        </div>

        <nav className="header-nav d-flex flex-wrap align-items-center gap-2">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn btn-outline-light btn-sm nav-pill ${isActive ? 'active-nav' : ''}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `btn btn-primary btn-sm nav-pill ${isActive ? 'active-nav' : ''}`
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `btn btn-outline-light btn-sm nav-pill ${isActive ? 'active-nav' : ''}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/change-password"
                className={({ isActive }) =>
                  `btn btn-outline-light btn-sm nav-pill ${isActive ? 'active-nav' : ''}`
                }
              >
                Change Password
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `btn btn-outline-light btn-sm nav-pill ${isActive ? 'active-nav' : ''}`
                  }
                >
                  Admin
                </NavLink>
              )}
              <button type="button" className="btn btn-danger btn-sm nav-pill" onClick={handleLogout}>
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
