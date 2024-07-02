import React from 'react';
// import { HomeIcon } from '@heroicons/react/solid';

const AppBar: React.FC = () => {
  return (
    <div className="w-full h-16 bg-blue-500 flex items-center justify-between px-4">
      <button className="flex items-center text-white">
        {/* <HomeIcon className="h-6 w-6 mr-2" /> */}
        Home
      </button>
      <div className="flex space-x-4">
        <button className="text-white">登录</button>
        <button className="text-white">注册</button>
      </div>
    </div>
  );
};

export default AppBar;
