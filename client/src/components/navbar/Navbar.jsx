import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export const Navbar = () => {

  const [openSlider, setOpenSlider] = useState(false)

  const {user, dispatch} = useContext(AuthContext);
  
  const Logout = ({OpenSlider}) => {
    function handleClick(){
      OpenSlider(false)
      dispatch({type: "LOGOUT"});
    }

    return (
      <div className="logout">
        <div className="lContainer">
          <div className="lItems">
            <h1 className='lTitle'>Are sure you want to logout!</h1>
             <div className="lButtonContainer">
                <button className="logoutButton" onClick={handleClick}>Yes</button>
                <button className="logoutButton" onClick={() => OpenSlider(false)}>No</button>
             </div>
          
          </div>
        </div>
      </div>
    )
  }
  
  function handleLogout(){
    return  setOpenSlider(true)
  }


  return (

    
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
            <span className="logo">HotelBooking</span>
          </Link>
            {user ? 
            <div className="navItems">
              <div className="username">
               {user.username}
              </div>
              <button className="navButton" onClick={handleLogout}>Log Out</button>
            </div>
            : <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>}
        </div>
        {openSlider && <Logout OpenSlider={setOpenSlider}/>}
    </div>
  )
}
