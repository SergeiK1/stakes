import React from 'react'
import Sidebar from '../Components/Sidebar';
import TopNavbar from '../Components/Topbar';
import MainContent from '../Components/HomeMain';
import Footer from '../Components/Footer';
import "../Styles/Home.css"

export default function Home() {
  return (
    <div className='home'>
        <Sidebar />
        <TopNavbar />
        <MainContent />
        <Footer />
    </div>
  )
}
