'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"


const ListPage: React.FC = () => {

  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
      <div>
        <Link href="/detail">
          <button className='bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 m-2 rounded'>goto detail</button>
        </Link>
      </div>
      <div>
        list page
      </div>
    </div>

  );
};

export default ListPage