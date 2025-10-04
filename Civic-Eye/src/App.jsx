import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)
  const [authStatus, setAuthStatus] = useState(true);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
