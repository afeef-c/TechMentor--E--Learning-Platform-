import React from 'react'
import DashSideNavbar from '../../components/admin/DashSideNavbar'
import { Outlet } from 'react-router-dom';
import NavDashboard from '../../components/tutor/NavDashboard';


function UsersDashboard() {
  return (
    
    <div>
        <NavDashboard/>
        <div className="main-content">
            <Outlet />
        </div>


    </div>
  )
}

export default UsersDashboard
