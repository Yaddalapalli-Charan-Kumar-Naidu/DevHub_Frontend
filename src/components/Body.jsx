import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
const Body = () => {
  return (
    <div>
      <Navbar/>

      <Outlet/>

      <Footer/>
    </div>  
  )
}

export default Body;
