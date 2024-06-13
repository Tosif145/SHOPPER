import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navPofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
       <img src={navlogo} alt="" className="nav-logo" />
       <img src={navPofile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
