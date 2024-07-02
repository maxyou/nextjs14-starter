'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import  User from '../../models/User';

const UserEdit = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
      fetch('/api/user')
          .then(response => response.json())
          .then(data => setUsers(data));
  }, []);

  const addUser = async () => {
    console.log("addUser:");
    console.log(name, email);
      const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
  };

  const deleteUser = async (id: number) => {
      await fetch(`/api/user`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
      });
      setUsers(users.filter(user => user.id !== id));
  };

  return (
      <div>
          <h1>User Edit</h1>
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
          <ul>
              {users.map((user) => (
                  <li key={user.id}>
                      {user.name} ({user.email})
                      <button onClick={() => deleteUser(user.id!)}>Del</button>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default UserEdit;