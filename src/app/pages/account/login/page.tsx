import PageClient from './PageClient'

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