import { useEffect } from 'react'

import './App.css'
// import Design from './signup-login/Design'
import Signup from './signup-login/Signup'

import AOS from 'aos'
import Login from './signup-login/Login'
import Navbar from './components/Navbar'

function App() {
  

  useEffect (() =>{
       AOS.init({duration : 3000});
  },[])

  return (
    <>
    <Navbar />
   
      <div className='w-full h-screen bg-amber-400'>
        <Signup />
        <Login />
      </div>
      </>
    
  )
}

export default App
//n ok so sad life hello njfewnfoewofewofnoew