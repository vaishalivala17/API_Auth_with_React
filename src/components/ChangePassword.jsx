import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/authSlice';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const { isAuthLoading, error } = useSelector((s) => s.auth);
    const [successMessage, setSuccessMessage] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        dispatch(changePassword({ oldPassword, newPassword }))
            .unwrap()
            .then((res) => {
                setSuccessMessage(res?.msg || 'Password changed successfully.');
            })
            .catch(() => {});
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-4 text-center">Change Password</h2>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter current password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
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
                                    {isAuthLoading ? 'Updating...' : 'Change password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

