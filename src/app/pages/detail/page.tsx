import { headers, cookies } from 'next/headers'
import PageClient from './pageclient'

export default async function PageServer() {
  
  return (
    <div>      
        <div>
          <PageClient />
        </div>
    </div>
  )
}