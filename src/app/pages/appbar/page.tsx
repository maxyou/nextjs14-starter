import { headers, cookies } from 'next/headers'

import PageClient from './PageClient'


export default async function PageServer() {
  const headersList = headers()
  const middlewareSet = headersList.get('middlewareSet') || ''
  console.log(`Home middlewareSet: ${middlewareSet}`)

  return (
    <div>
      <div>/appbar/layout</div>
      <div>
        <PageClient middlewareSet={middlewareSet}/>
      </div>
    </div>
  )
}