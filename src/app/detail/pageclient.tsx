'use client'

import React from 'react';
import TodoListPage from './todolist'

const ClientPage: React.FC = () => {

    console.log('todolist/pageclient.tsx, jwtUser:')

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <TodoListPage />
                </div>
        </div>
    )
}

export default ClientPage