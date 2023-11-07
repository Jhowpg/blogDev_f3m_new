import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
<<<<<<< HEAD
=======


>>>>>>> 5b378e34046013913859f0e6765c13050a2988fc

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/register' element={<Register />}></Route>
<<<<<<< HEAD
            <Route path='/login' element={<Login/>}></Route>
=======
            <Route path='/login' element={<Login />}></Route>
>>>>>>> 5b378e34046013913859f0e6765c13050a2988fc
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
