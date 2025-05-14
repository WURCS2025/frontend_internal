import React, { useEffect, useState } from "react";
import { USER_LIST_URL, ADD_USER_URL, DELETE_USER_URL, chgpwd_URL} from "../../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useConfirmation } from "../common/BooleanConfirmationHook";
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
  const { confirm, Confirmation } = useConfirmation();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userToAdd, setUserToAdd] = useState<User | null >(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const filteredUsers = roleFilter === "all" ? users : users.filter(user => user.userrole === roleFilter);


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

  const handlePasswordUpdate = async () => {
    if (!selectedUser) return;
    if (passwordForm.password !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch(`${chgpwd_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: selectedUser.username,         // ensure this exists
        newPwd: passwordForm.password,
        confirmPwd: passwordForm.confirmPassword, // ensure your form has this field
      }),
    })
      .then((res) => {
        if (res.ok) {
          confirm({
            title: "Password Updated",
            description: `Password for user "${selectedUser.username}" has been updated successfully.`,
            confirmLabel: "OK",
          });
          setShowPasswordModal(false);
        } else {
          return res.text().then((message) => {
            throw new Error(message);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert(error.message);
      });
  };


  return (
    <div className="grid-container usa-prose">
      <h2>User Management</h2>

      <div className="margin-top-2 margin-bottom-2" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <button
    className="usa-button"
    onClick={() => setShowAddForm(!showAddForm)}
    title="Add a new user"
  >
    {showAddForm ? "Cancel" : "Add New User"}
  </button>

  <label htmlFor="role-filter" className="usa-label margin-right-1" style={{ marginBottom: 0 }}>
    Filter by Role:
  </label>

  <select
    id="role-filter"
    className="usa-select"
    style={{ width: "20%" }}
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
  >
    <option value="all">All</option>
    <option value="user">User</option>
    <option value="analyst">Analyst</option>
    <option value="admin">Admin</option>
  </select>
</div>

<div className="margin-bottom-1">
  <strong>Total Users: {filteredUsers.length}</strong>
</div>
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
{Confirmation}
      <ConfirmationModal
  isOpen={showDeleteModal}
  title="Confirm Deletion"
  description={`Are you sure you want to delete user "${userToDelete?.username}"? `}
  confirmLabel="Yes, delete user"
  cancelLabel="Cancel"
  onConfirm={() => {
    if (!userToDelete) return;

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

    const payload = { admin: localStorage.getItem("user"), username: userToDelete.username };
    fetch(`${DELETE_USER_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((username) => {
        console.log("User deleted:", username);
        setUsers(users.filter((user) => user.username !== username));
        setShowDeleteModal(false);
        setUserToDelete(null);
        
      })
      .catch((error) => console.error("Error deleting user:", error));
  
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
              <input className="usa-input" type="text" value={newUser.firstname} placeholder="first name" onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Last Name</label>
              <input className="usa-input" type="text" value={newUser.lastname} placeholder="last name" onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Username</label>
              <input className="usa-input" type="text" value={newUser.username} placeholder="username, must be unique" onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Email</label>
              <input className="usa-input" type="email" value={newUser.email} placeholder="email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Temporary Password</label>
              <input className="usa-input" type="password" value={newUser.password} placeholder="12+ chars: A-Z,a-z,0-9,special" onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Confirm Password</label>
              <input className="usa-input" type="password" value={newUser.confirmPassword} placeholder="Retype pwd, must match" onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })} />
            </div>
            <div className="tablet:grid-col-6">
              <label className="usa-label">Role</label>
              <select className="usa-select" value={newUser.userrole} onChange={(e) => setNewUser({ ...newUser, userrole: e.target.value })}>
                <option value="user">User</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button className="usa-button margin-top-2" onClick={handleAddUser}>Add User</button>
        </div>
      )}
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
          {filteredUsers.map((user) => (
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
                <button className="usa-button usa-button--unstyled" onClick={() => openPasswordModal(user)} title="Reset Password">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default AdminUserManagement;
