import React, { useContext } from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export const Navbar = () => {

  const {user} = useContext(AuthContext);

   
  // const userAccount = user.username;
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
              <button className="navLogButton">Log Out</button>
            </div>
            : <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>}
        </div>
    </div>
  )
}
