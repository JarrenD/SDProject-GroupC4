import React, { useState } from 'react';

const AdminUserRoleManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Darwin:   ', role: 'Admin' },
        { id: 2, name: 'Student:   ', role: 'User' },
    ]);

    const handleRoleChange = (id, newRole) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, role: newRole } : user
        ));
    };

    return (
        <div className="card user-role-management">
            <h2 className="card-title">User & Role Management</h2>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <span>{user.name}</span>
                        <select 
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="role-select"
                        >
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                    </div>
                ))}
            </div>
            <button className="manage-btn">Manage Roles</button>
        </div>
    );
};

export default AdminUserRoleManagement;