import React, { useEffect, useState } from "react";
import { USER_LIST_URL, ADD_USER_URL } from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from "../common/ConfirmationModal";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  userrole: string;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userToAdd, setUserToAdd] = useState<User | null >(null);
  const [userToDelete, setUserToDelete] = useState<User | null >(null);


  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    userrole: "user",
  });

  useEffect(() => {
    fetch(`${USER_LIST_URL}/userlist?username=${localStorage.getItem("user")}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  
  const isValidPassword = (password: string): boolean => {
    const lengthCheck = password.length >= 12;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const digitCheck = /[0-9]/.test(password);
    const specialCheck = /[^A-Za-z0-9]/.test(password);
  
    return lengthCheck && upperCheck && lowerCheck && digitCheck && specialCheck;
  };
  

  const handleDeleteUser = (id: string) => {
    var user = users.find((user) => user.id === id);
    
      setUserToDelete(user || null);
      setShowDeleteModal(true);
    
    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete the user "${userToDelete?.username}"? This action cannot be undone.`
    // );
  
    // if (!confirmDelete) return;
  
    // fetch(`/api/users/${id}`, { method: "DELETE" })
    //   .then(() => setUsers(users.filter((user) => user.id !== id)))
    //   .catch((error) => console.error("Error deleting user:", error));
  };

  const handleAddUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isValidPassword(newUser.password)) {
      alert("Password must be at least 12 characters long and include uppercase letters, lowercase letters, digits, and special characters.");
      return;
    }

    const payload = { "id": '', ...newUser };

    const newUserCopy: User = {
      id: "",
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      username: newUser.username,
      userrole: newUser.userrole,
    };

    fetch(`${ADD_USER_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers([...users, user]);
        setUserToAdd(newUserCopy)
        setShowAddModal(true);
        
        setNewUser({
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          userrole: "user",
        });
        setShowAddForm(false);
        
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setPasswordForm({ password: "", confirmPassword: "" });
    setShowPasswordModal(true);
  };

  const handlePasswordUpdate = () => {
    if (!selectedUser) return;
    if (passwordForm.password !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch(`/api/users/${selectedUser.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordForm.password }),
    })
      .then((res) => {
        if (res.ok) alert("Password updated successfully");
        else throw new Error("Failed to update password");
        setShowPasswordModal(false);
      })
      .catch((error) => console.error("Error updating password:", error));
  };

  return (
    <div className="grid-container usa-prose">
      <h2>User Management</h2>

      <button className="usa-button" onClick={() => setShowAddForm(!showAddForm)} title="Add a new user">
        {showAddForm ? "Cancel" : "Add New User"}
      </button>

      <ConfirmationModal
  isOpen={showAddModal}
  title="New User Added"
  description={`User "${userToAdd?.username}" is added successfully `}
  confirmLabel="OK"
  cancelLabel = ""
  onConfirm={() => {
   
    setShowAddModal(false);
    setUserToAdd(null);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
/>

      <ConfirmationModal
  isOpen={showDeleteModal}
  title="Confirm Deletion"
  description={`Are you sure you want to delete user "${userToDelete?.username}"? `}
  confirmLabel="Yes, delete user"
  cancelLabel="Cancel"
  onConfirm={() => {
    if (userToDelete) {
      fetch(`/api/users/${userToDelete.id}`, { method: "DELETE" })
        .then(() => {
          setUsers(users.filter((user) => user.id !== userToDelete.id));
          setShowDeleteModal(false);
          setUserToDelete(null);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setShowDeleteModal(false);
        });
    }
  }}
  onCancel={() => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  }}
/>

      {showAddForm && (
        <div className="usa-form usa-form--large margin-top-2">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-6">
              <label className="usa-label">First Name</label>
              <input className="usa-input" type="text" value={newUser.firstname} onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Last Name</label>
              <input className="usa-input" type="text" value={newUser.lastname} onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Username</label>
              <input className="usa-input" type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Email</label>
              <input className="usa-input" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Temporary Password</label>
              <input className="usa-input" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Confirm Password</label>
              <input className="usa-input" type="password" value={newUser.confirmPassword} onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Role</label>
              <select className="usa-select" value={newUser.userrole} onChange={(e) => setNewUser({ ...newUser, userrole: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button className="usa-button margin-top-2" onClick={handleAddUser}>Add User</button>
        </div>
      )}

      <table className="usa-table usa-table--borderless usa-table--striped margin-top-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.userrole}</td>
              <td>
                <button className="usa-button usa-button--unstyled margin-right-1" onClick={() => handleDeleteUser(user.id)} title='Delete User'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="usa-button usa-button--unstyled" onClick={() => openPasswordModal(user)} title="Update Password">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPasswordModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Password for {selectedUser.username}</h3>
            <label className="usa-label">New Password</label>
            <input className="usa-input" type="password" value={passwordForm.password} onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })} />
            <label className="usa-label">Confirm Password</label>
            <input className="usa-input" type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
            <div className="margin-top-2">
              <button className="usa-button" onClick={handlePasswordUpdate}>Submit</button>
              <button className="usa-button usa-button--secondary margin-left-1" onClick={() => setShowPasswordModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
