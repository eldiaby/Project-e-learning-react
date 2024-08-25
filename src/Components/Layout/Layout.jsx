import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
   <Navbar/>
   <div className=" mb-5 pb-5">
        <Outlet></Outlet>
   </div>
  <Footer/>
  </>
}
