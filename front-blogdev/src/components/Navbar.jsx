import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useAuthValue } from '../context/AuthContext'
import { userAuthentication } from '../hooks/userAuthentication'

const Navbar = () => {
  const { user } = useAuthValue()
  const { userLogout } = userAuthentication()
  const navigate = useNavigate()
  const handlerLogout = () => {
    userLogout()
    navigate('/login')
  }
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>Dev</span>{user && <code> - {user.displayName}</code>}
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/'
              className={({ isActive }) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/login'
              className={({ isActive }) => (isActive ? styles.active : null)}>Login</NavLink>
          </li>
          <li>
            <NavLink to='/register'
              className={({ isActive }) => (isActive ? styles.active : null)}>Register</NavLink>
          </li>
          <li>
            <NavLink to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}>About</NavLink>
          </li>
          {user &&
            <li>
              <a className={styles.logout} onClick={handlerLogout}>Logout</a>
            </li>
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar