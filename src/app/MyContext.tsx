'use client'
// MyContext.js
import React, { createContext, ReactNode, useContext, useState, useCallback, useEffect } from 'react';
import { PrismaClient, User } from '@prisma/client';
import { serverActionfetchUsers, serverActionAddUser, serverActionUpdateUser, serverActionDeleteUser } from './serverAction';
import { UserDTO, UserContext } from '@/common/interface/User';
import { codeConfig } from '@/config.mjs';


// 定义Context的类型
interface MyContextType {
  user: UserContext | null;
  // setUser: React.Dispatch<React.SetStateAction<UserContext | null>>;
  updateUser: (userData:UserDTO) => Promise<void>;
}

// 创建Context
export const MyContext = createContext<MyContextType | undefined>(undefined);

// 创建自定义Provider组件
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<UserContext | null>(null);
  console.log(`MyContext.tsx: MyProvider user: ${JSON.stringify(user)}`);

  const updateUser = useCallback(async (userData:UserDTO) => {
    console.log(`MyContext.tsx: updateUser userData: ${JSON.stringify(userData)}`);
    setUser(userData);
  }, []);

  return (
    <MyContext.Provider value={{ user, updateUser }}>
      {children}
    </MyContext.Provider>
  );
};

