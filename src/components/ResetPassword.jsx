import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, error } = useSelector((s) => s.auth);

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
            .catch(() => {});
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>Reset Password</h2>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                />
                <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                />
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 10 }}>
                    {isLoading ? 'Resetting...' : 'Reset password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

