
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Pages/Hero'

function App() {
  

  return (
    <>
    <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
