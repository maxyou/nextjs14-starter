'use client'

import React from 'react';
import Login from './Login'


const ClientPage: React.FC = () => {

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <Login />
                </div>
        </div>
    )
}

export default ClientPage