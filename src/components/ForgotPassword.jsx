import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((s) => s.auth);

    const [email, setEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({ email }))
            .unwrap()
            .then((res) => {
                alert(res?.msg || 'OTP generated! Static OTP is 1234.');
                navigate('/reset-password', { state: { email } });
            })
            .catch(() => {});
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
            <h2>Forgot Password</h2>
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
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: 10 }}>
                    {isLoading ? 'Sending...' : 'Send reset link'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

