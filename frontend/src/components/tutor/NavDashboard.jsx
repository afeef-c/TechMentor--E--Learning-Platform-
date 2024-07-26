import React from 'react'
import { NavLink,Link ,useNavigate } from 'react-router-dom';


function NavDashboard() {
  return (
    <>

        <div className="main-sidebar sidebar-style-2" >
        
        
            <aside id="sidebar-wrapper">
                <div className="container-fluid ">
                <div className="row border-top px-xl-5">
                <div className="sidebar-brand">
                    <img alt="techMentor" src="/assets/img/techMentor_logo.png" style={{ width: 100 }} />                    
                </div>
                <div className="sidebar-brand"></div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <a href="/">T M</a>
                </div>
                <br />
                <nav className="sidebar-menu navbar-light py-3 py-lg-0 px-0">
                    <li className="menu-header">Dashboard</li>
        
                    <div className="navbar-nav py-1">
                        
                        <NavLink to="/dashboard/bio/" className="nav-item nav-link" >
                            <i className="fas fa-tachometer-alt"/> Dashboard
                        </NavLink>
                        <NavLink to="/dashboard/edit_profile/" className="nav-item nav-link" >
                            <i className="fas fa-edit"></i> Edit Details
                        </NavLink>
                        <NavLink to="courses/" className="nav-item nav-link" >
                            <i className="fas fa-envelope"></i> Messages
                        </NavLink>
                        <NavLink to="/tutors" className="nav-item nav-link" >
                            <i className="fas fa-book"></i> Courses
                        </NavLink>
                        <NavLink to="contact" className="nav-item nav-link" >
                            <i className="fas fa-phone"></i> Contact
                        </NavLink>
                    </div>

                </nav>
                <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
                
                </div>
                </div>
                </div>      
            </aside>
        </div>
        
    </>
  )
}

export default NavDashboard
