import ReactDOM from 'react-dom/client'
import '@fontsource/ubuntu'
import '../Globals.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'

const router = createBrowserRouter([
  {
    path: '/editor.html/',
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

export default function App () {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
