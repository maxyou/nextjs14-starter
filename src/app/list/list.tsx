'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const ListPage: React.FC = () => {

  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
      <div>
        list page
        </div>

    </div>

  );
};

export default ListPage