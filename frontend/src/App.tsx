
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OAuthCallback from './components/callback'


import Authpage from './routes/AuthPage'

function App() {
 

  return (

   <BrowserRouter>  {/* One router at top level */}
      <div className='h-screen w-screen flex justify-center items-center bg-slate-900'>
        <Routes>
          <Route path='/' element={<Authpage/>} />
          <Route path='/auth/callback' element={<OAuthCallback />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  )
}

export default App
