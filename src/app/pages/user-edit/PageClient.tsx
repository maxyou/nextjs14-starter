'use client'

import React from 'react';
import UserEditPage from './UserEdit'


const ClientPage: React.FC = () => {

    console.log('todolist/pageclient.tsx, jwtUser:')

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <UserEditPage />
                </div>
        </div>
    )
}

export default ClientPage