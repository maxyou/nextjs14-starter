'use client'

import React from 'react';
import Register from './Register'


const ClientPage: React.FC = () => {

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <Register />
                </div>
        </div>
    )
}

export default ClientPage