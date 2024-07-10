import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactModal from 'react-modal';
import Link from "next/link";
import User from '../../models/User';
import { serverActionfetchUsers, serverActionAddUser, serverActionUpdateUser, serverActionDeleteUser } from './serverAction';

// ReactModal.setAppElement('#__next'); // To prevent screen readers from focusing on background content

const UserEdit = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editUserId, setEditUserId] = useState<number | null>(null);

    // async function serverActionfetchUsers() {
    //     'use server'; // 指示这个函数在服务器端运行
    //     console.log("server action GET all users");
    //     const users = await getAllUsers();
    //     return users;
    //   }

    const fetchUsers = async () => {
        // const response = await fetch('/api/user');
        // const data = await response.json();
        const data = await serverActionfetchUsers();
        setUsers(JSON.parse(data) as User[]);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setName('');
        setEmail('');
        setIsEditMode(false);
        setEditUserId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            if (editUserId !== null) {
                // const response = await fetch(`/api/user`, {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ id:editUserId, name, email }),
                // });
                // const updatedUser = await response.json();
                const updatedUser = await serverActionUpdateUser({id: editUserId, name, email});
                console.log(updatedUser);
                fetchUsers();
            }
        } else {
            // const response = await fetch('/api/user', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name, email }),
            // });
            // const newUser = await response.json();
            const newUser = await serverActionAddUser({name, email});
            console.log(newUser);
            fetchUsers();
        }
        closeModal();
    };

    const deleteUser = async (id: number) => {
        // await fetch(`/api/user?id=${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        await serverActionDeleteUser(id);
        fetchUsers();
    };

    const openEditModal = (user: User) => {
        setName(user.name);
        setEmail(user.email);
        setEditUserId(user.id || null);
        setIsEditMode(true);
        openModal();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Edit</h1>
            <button
                onClick={openModal}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add User
            </button>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-2 border-b border-gray-300">
                        <div>
                            {user.name} ({user.email})
                        </div>
                        <div>
                            <button
                                onClick={() => openEditModal(user)}
                                className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteUser(user.id!)}
                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Del
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ReactModal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isEditMode ? 'Edit User' : 'Add User'}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {isEditMode ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </ReactModal>
        </div>
    );
};

export default UserEdit;
