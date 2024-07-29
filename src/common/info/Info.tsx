'use client'

import React, { useState, useEffect, useContext } from 'react';
// import { HomeIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import { MyContext } from '@/app/MyContext';
import { JwtUser } from '@/app/dto/User'


const Info: React.FC = () => {

  const myContext = useContext(MyContext);

  return (
    <div className="w-full h-16 bg-blue-500 flex items-center justify-between px-4">
      <div className="text-white">{JSON.stringify(myContext?.user)}</div>
    </div>
  );
};

export default Info;
