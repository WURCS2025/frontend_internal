// AdminUserManagement.tsx (Admin User Management Page)
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", username: "", password: "", role: "user" });

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDeleteUser = (id: string) => {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleAddUser = () => {
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((user) => setUsers([...users, user]))
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <input type="text" placeholder="First Name" onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name" onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
        <input type="text" placeholder="Username" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="password" placeholder="Temp Password" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <select onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.role}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserManagement;