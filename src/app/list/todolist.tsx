'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const TodoListPage: React.FC = () => {

  const router = useRouter();

  return (

    <div className="container mx-auto p-4">
      <div>
        todo list
        </div>

    </div>

  );
};

export default TodoListPage