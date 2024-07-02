import { headers, cookies } from 'next/headers'
import PageClient from './pageclient'

// import ChildLayout from './sublist/layout'
// import Page from './sublist/page'

export default async function PageServer() {

  return (
    <div>
      <div>
        <PageClient />
      </div>
      {/* <ChildLayout>
        <Page />
      </ChildLayout> */}
    </div>
  )
}