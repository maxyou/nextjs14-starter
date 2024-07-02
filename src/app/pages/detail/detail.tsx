'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import CommentList from '../comment/comment';

const DetailPage: React.FC = () => {

  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
          <div>
        <Link href="/list">
          <button className='bg-blue-500 min-w-fit hover:bg-blue-700 text-white p-2 m-2 rounded'>back to list</button>
        </Link>
      </div>
      <div>
        detail page
      </div>
      <CommentList />
    </div>

  );
};

export default DetailPage