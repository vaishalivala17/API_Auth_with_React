import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store/authSlice';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((s) => s.auth);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword({ oldPassword, newPassword }));
    };

    return (
        <div style={{ maxWidth: 420, margin: '50px auto', padding: 20 }}>
            <h2>Change Password</h2>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <form onSubmit={onSubmit}>
                <input
                    type="password"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                    {isLoading ? 'Updating...' : 'Change password'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;

