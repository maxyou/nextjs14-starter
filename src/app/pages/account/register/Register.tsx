import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactModal from 'react-modal';
import Link from "next/link";
import { PrismaClient, User } from '@prisma/client';
import { UserDTO, UserAdd, JwtUser } from '@/common/interface/User';
import { codeConfig } from '@/config.mjs';
import { serverActionRegister } from './serverAction';
import { ROUTES } from '@/routes';

// ReactModal.setAppElement('#__next'); // To prevent screen readers from focusing on background content

const Register = () => {

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setSuggestion('Inconsistent password input');
    } else {
      setSuggestion('');
    }
  };

  const handleGotoLogin = () => {
    router.push(ROUTES.account.login);
  }

  const handleRegister = () => {

    if (codeConfig.fetchServerCode === 'api') {
      handleRegisterApi();
    } else if (codeConfig.fetchServerCode === 'serverAction') {
      handleRegisterServerAction();
    }
  }


  const handleRegisterServerAction = () => {

    const userRegister = {
      authType: 'register',
      name: name,
      email: email,
      password: password,
    };

    console.log(`server action register, user name: ${name}, password: ${password}`);

    serverActionRegister(userRegister)
      .then((data) => {
        console.log(data);
        const ret: { code: number, message: string, data: UserDTO } = JSON.parse(data);
        if (ret.code === 0) {
          // router.refresh();
          // redirect to todolist page
          // router.push(`/biz/todolist?${Math.random().toString()}`);
          console.log(`Register successed, router.push to: ${ROUTES.user.edit}`);
          router.push(`${ROUTES.user.edit}?${Math.random().toString()}`);
        } else {
          setSuggestion(ret.message);
          console.log(`Register failed: ${ret.message}`);
        }
      });
  }

  const handleRegisterApi = () => {

    const url = ROUTES.api.userRegister;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        authType: 'register'
      }),
    };

    console.log(`POST name: ${name}, password: ${password}`);

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 0) {
          // redirect to todolist page
          // router.push(`/biz/todolist?${Math.random().toString()}`);
          // router.push(ROUTES.home);
          router.push(`${ROUTES.user.edit}?${Math.random().toString()}`);
        }
      });


    // Perform registration logic here
    // You can send the data to an API or handle it as per your requirement
    console.log('Registration submitted');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {suggestion && <p className="text-red-500 mt-1">{suggestion}</p>}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="text-blue-500 underline focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleGotoLogin}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
