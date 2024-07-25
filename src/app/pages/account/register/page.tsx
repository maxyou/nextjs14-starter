import PageClient from './PageClient'

export default async function PageServer() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <PageClient />
      </div>      
    </div>
  )
}