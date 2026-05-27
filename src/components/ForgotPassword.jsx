import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthLoading, error } = useSelector((s) => s.auth);

    const [email, setEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({ email }))
            .unwrap()
            .then((res) => {
                alert(res?.msg || 'OTP generated! Static OTP is 1234.');
                navigate('/reset-password', { state: { email } });
            })
            .catch(() => { });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-4 text-center">Forgot Password</h2>

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

                                <button type="submit" className="btn btn-primary w-100" disabled={isAuthLoading}>
                                    {isAuthLoading ? 'Sending...' : 'Send reset link'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

