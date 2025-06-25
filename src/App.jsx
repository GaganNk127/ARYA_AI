import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from "react-router"
import Home from './pages/Home.jsx'
import Chatbot from './pages/Chatbot.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chatbot' element={<Chatbot />} />
      </Routes>
   
  )
}

export default App
