import React from 'react';
// import { HomeIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const AppBar: React.FC = () => {
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
      </div>
    </div>
  );
};

export default AppBar;
