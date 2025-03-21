import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import { AppContext } from "../context/AppContext";

const HospitalBody = () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/> 
    </div>
  )
}

export default HospitalBody