'use client'

import React from 'react';
// import { HomeIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { ROUTES } from '@/routes';

const AppBar: React.FC = () => {

  const handleLogout = () => {

    const url = ROUTES.api.userLogout;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ }),
    };    
    

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {        
        console.log(data);
        if (data.code === 0) {          
          // redirect to todolist page
          // router.push(`/biz/todolist?${Math.random().toString()}`);
          // router.push(ROUTES.home);
          // router.push(ROUTES.user.edit);
        }
      });


    // Perform registration logic here
    // You can send the data to an API or handle it as per your requirement
    console.log('Registration submitted');
  };

  return (
    <div className="w-full h-16 bg-blue-500 flex items-center justify-between px-4">
      <Link href="/pages/user-edit">
        <button className="flex items-center text-white">
          {/* <HomeIcon className="h-6 w-6 mr-2" /> */}
          Home
        </button>
      </Link>
      <div className="flex space-x-4">
        <Link href="/pages/account/login">
          <button className="text-white">登录</button>
        </Link>
        <Link href="/pages/account/register">
          <button className="text-white">注册</button>
        </Link>
        <button onClick={handleLogout} className="text-white">退出</button>
      </div>
    </div>
  );
};

export default AppBar;
