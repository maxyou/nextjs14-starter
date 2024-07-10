'use client'

import React from 'react';
import ListPage from './List'


const ClientPage: React.FC = () => {

    console.log('todolist/pageclient.tsx, jwtUser:')

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <ListPage />
                </div>
        </div>
    )
}

export default ClientPage