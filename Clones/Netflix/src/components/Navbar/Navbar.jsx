import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_iocn from '../../assets/search_icon.svg'
import bell_iocn from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_iocn from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_iocn} alt="" className='icons' />
        <p className='text'>Children</p>
        <img src={bell_iocn} alt="" className='icons' />
        <div className='navbar-profile'>
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_iocn} alt="" />
          <div className="dropdown">
            <p onClick={() => {logout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar