'use client'

import React from 'react';
import DetailPage from './Detail'

const ClientPage: React.FC = () => {

    console.log('todolist/pageclient.tsx, jwtUser:')

    return (
        <div>
                <div>

                    {/* <p>ClientPage</p>
                    {
                        jwtUser && JSON.stringify({ jwtUser })
                    } */}
                    <DetailPage />
                </div>
        </div>
    )
}

export default ClientPage