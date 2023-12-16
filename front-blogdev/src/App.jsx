import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { AuthProvidor } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { userAuthentication } from './hooks/userAuthentication'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import errorLoading from './assets/errorLoading.gif'
import CreatePost from './pages/CreatePost/CreatePot'
import DashBoard from './pages/DashBoard/DashBoard'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = userAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, user => (
      setUser(user)
    ))
  }, [auth])
  if (loadingUser) {
    return <div className='container load'> <img src={errorLoading} alt="Gif Loading User" /></div>
  }

  return (
    <>
      <AuthProvidor value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/post/create' element={<CreatePost />}></Route>
              <Route path='/dashboard' element={<DashBoard />}></Route>
              <Route path='/posts/:id' element={<Post />}></Route>
              <Route path='/posts/edit/:id' element={<EditPost />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvidor>
    </>
  )
}

export default App
