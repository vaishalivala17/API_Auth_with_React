import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthLoading, error } = useSelector((s) => s.auth);

    const [email, setEmail] = useState(location.state?.email || '');
    const [otp, setOtp] = useState('1234');
    const [newPassword, setNewPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email, otp, newPassword }))
            .unwrap()
            .then(() => {
                alert('Password reset successful');
                navigate('/login', { replace: true });
            })
            .catch(() => { });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-4 text-center">Reset Password</h2>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={isAuthLoading}>
                                    {isAuthLoading ? 'Resetting...' : 'Reset password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

