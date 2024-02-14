import React, { useContext, useState } from 'react'
import "./Login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export const Login = () => {

  const[credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const { loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials(prev => ({...prev, [e.target.id]: e.target.value }))
  }

  const handleClick =async e => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      navigate("/");
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
    }
  }


  return (
    <div className='login'>
      <div className="Container">
        <h1 className='lHeader'>Login to your account</h1>
        <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput'/>
        <input type="password" placeholder='password' id='password' onChange={handleChange} className='lInput'/>
        <button disabled={loading} onClick={handleClick} className='lButton'>Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}
