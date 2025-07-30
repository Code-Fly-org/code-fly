import ReactDOM from 'react-dom/client'
import '@fontsource/ubuntu'
import '../Globals.css'
import Home from './routes/Home'

export default function App () {
  return (
    <>
      <Home />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
