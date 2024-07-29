'use client'

import React, { useState, useEffect, useContext,  } from 'react';
// import { HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import { MyContext } from '@/app/MyContext';
import { JwtUser, UserDTO } from '@/common/interface/User'
import { codeConfig } from '@/config.mjs';
import { serverActionLogout } from './serverAction';

interface ClientPageProps {
  middlewareSet: string; // Replace 'any' with the appropriate type for middlewareSet
}

const AppBar: React.FC<ClientPageProps> = ({ middlewareSet }) => {
  
  const router = useRouter();

  const myContext = useContext(MyContext);
  console.log(`AppBar props middlewareSet: ${middlewareSet}`);

  let jwtUser = null;
  if (middlewareSet) {
    jwtUser = JSON.parse(middlewareSet) as JwtUser
    // myContext?.updateUser(jwtUser);  
  }

  useEffect(() => {    
    if (jwtUser) {
      myContext?.updateUser(jwtUser)
    }
  }, [middlewareSet]);

  const handleLogout = () => {

    if (codeConfig.fetchServerCode === 'api') {
      handleLogoutApi();
    } else if (codeConfig.fetchServerCode === 'serverAction') {
      handleLogoutServerAction();
    }
  }

  const handleLogoutServerAction = () => {

    console.log(`server action logout`);

    serverActionLogout()
      .then((data) => {
        console.log(data);
        const ret:{code:number, message:string, data:UserDTO} = JSON.parse(data);
        if (ret.code === 0) {
          router.push(ROUTES.home);
          router.refresh();
        } else {          
          console.log(`Login failed: ${ret.message}`);
        }
      });
}
  const handleLogoutApi = () => {

    console.log(`api logout`);

    const url = ROUTES.api.userLogout;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };


    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 0) {
          // redirect to todolist page
          // router.push(`/biz/todolist?${Math.random().toString()}`);
          router.push(ROUTES.home);
          // router.push(ROUTES.user.edit);
          // router.push(ROUTES.account.login);
          router.refresh();
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
      {/* <div className="text-white">{JSON.stringify(myContext?.user?.name)}</div> */}
      <div className="text-white">{jwtUser?.name}</div>
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
