import React, { useState } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { userLogin, error: authError, loading } = userAuthentication()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const user_data = {
      email,
      password
    }
    try {
      const user = await userLogin(user_data)
      if (user) {
        console.log(user)
        navigate('/')
      }

    } catch (error) {
      console.error(error)
    }
  }

  // if(loading) {
  //   return <>carregando...</>
  // }

  return (
    <div>
      <h1>Compartilhe suas experiências com outros nomades</h1>
      <form onSubmit={handlerSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com seu e-mail"></input>
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entre com sua senha"></input>
        </label>
        <button className="btn">Login</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
  //#end region
}

export default Login