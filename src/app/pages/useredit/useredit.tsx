'use client'

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';  // You'll need to install this package

import User from '../../models/User';

const UserEdit = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async () => {
    await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });
    setName('');
    setEmail('');
    setIsAddModalOpen(false);
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await fetch(`/api/user?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    fetchUsers();
  };

  const editUserDetails = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const updateUser = async () => {
    if (!editUser) return;

    await fetch('/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editUser.id, name: editUser.name, email: editUser.email }),
    });
    setIsEditModalOpen(false);
    fetchUsers();
  };

  return (
      <div>
          <h1>User Edit</h1>
          <button onClick={() => setIsAddModalOpen(true)}>Add User</button>
          <ul>
              {users.map((user) => (
                  <li key={user.id}>
                      {user.name} ({user.email})
                      <button onClick={() => deleteUser(user.id!)}>Del</button>
                      <button onClick={() => editUserDetails(user)}>Edit</button>
                  </li>
              ))}
          </ul>
          {/* Add User Modal */}
          <Modal
              isOpen={isAddModalOpen}
              onRequestClose={() => setIsAddModalOpen(false)}
              contentLabel="Add User"
          >
              <h2>Add User</h2>
              <div>
                  <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={addUser}>Add</button>
              </div>
          </Modal>
          {/* Edit User Modal */}
          <Modal
              isOpen={isEditModalOpen}
              onRequestClose={() => setIsEditModalOpen(false)}
              contentLabel="Edit User"
          >
              <h2>Edit User</h2>
              {editUser && (
                  <div>
                      <input
                          type="text"
                          placeholder="Name"
                          value={editUser.name}
                          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      />
                      <input
                          type="email"
                          placeholder="Email"
                          value={editUser.email}
                          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      />
                      <button onClick={updateUser}>Update</button>
                  </div>
              )}
          </Modal>
      </div>
  );
};

export default UserEdit;
