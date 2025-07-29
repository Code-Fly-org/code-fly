import ReactDOM from 'react-dom/client'
import '@fontsource/ubuntu'
import '../Globals.css'
import Sidebar from './componets/Sidebar'
import { useEffect, useState } from 'react'
import Projects from './routes/Projects'
import Settings from './routes/Settings'

export default function App () {
  const [hash, setHash] = useState(window.location.hash || '#projects')

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#projects')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('contextmenu', handler)
    return () => document.removeEventListener('contextmenu', handler)
  }, [])

  function renderContent () {
    if (hash === '#projects') {
      return <Projects />
    } else if (hash === '#settings') {
      return <Settings />
    }
    return null
  }

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='relative z-0 flex-1'>
          <main>{renderContent()}</main>
        </div>
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
