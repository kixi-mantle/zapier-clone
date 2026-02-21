
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OAuthCallback from './components/callback'
import LoginButton from './components/loginButton'

function App() {
 

  return (

   <BrowserRouter>  {/* One router at top level */}
      <div className='h-screen w-screen flex justify-center items-center'>
        <Routes>
          <Route path='/' element={<LoginButton />} />
          <Route path='/auth/callback' element={<OAuthCallback />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
