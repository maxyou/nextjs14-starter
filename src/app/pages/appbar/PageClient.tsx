'use client'

import React, { useState, useEffect, useContext } from 'react';
import AppBar from './AppBar';
import { MyContext } from '@/app/MyContext';
import { JwtUser } from '@/common/interface/User'

interface ClientPageProps {
  middlewareSet: string; // Replace 'any' with the appropriate type for middlewareSet
}

const ClientPage: React.FC<ClientPageProps> = ({middlewareSet}) => {

    const  myContext = useContext(MyContext);

    if(!middlewareSet) {
        const jwtUser = JSON.parse(middlewareSet) as JwtUser
        myContext?.updateUser(jwtUser);  
      }
    
    return (
        <div>
            <div>
                <AppBar  middlewareSet={middlewareSet}/>
            </div>
        </div>
    )
}

export default ClientPage