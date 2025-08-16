import Sidebar from './components/Sidebar'

export default function ProjectManager_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='relative z-0 flex-1'>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
