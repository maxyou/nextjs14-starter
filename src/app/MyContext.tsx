'use client'
// MyContext.js
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { PrismaClient, User } from '@prisma/client';
import { serverActionfetchUsers, serverActionAddUser, serverActionUpdateUser, serverActionDeleteUser } from './serverAction';
import { UserDTO, UserContext } from '@/app/dto/User';
import { codeConfig } from '@/config.mjs';


// 定义Context的类型
interface MyContextType {
    user: UserContext | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// 创建Context
export const MyContext = createContext<MyContextType | undefined>(undefined);

// 创建自定义Provider组件
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const handleSetUser = (user: User) => {
        setUser(user);
    }

    return (
      <MyContext.Provider value={{ user, setUser }}>
        {children}
      </MyContext.Provider>
    );
  };
  
