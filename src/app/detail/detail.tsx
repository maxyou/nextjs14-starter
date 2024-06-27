'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import CommentList from '../comment/comment';

const DetailPage: React.FC = () => {

  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
      <div>
        detail page
      </div>
      <CommentList />
    </div>

  );
};

export default DetailPage