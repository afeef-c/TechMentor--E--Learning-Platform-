import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { NavLink,Link ,useNavigate } from 'react-router-dom';
import {fetchUserDetails} from '../../authSlice';


function NavDashboard() {
    const dispatch = useDispatch()
    const authTokens = useSelector((state)=> state.auth.authTokens)
    useEffect(()=>{
        dispatch(fetchUserDetails())

    },[authTokens, dispatch])

    const user = useSelector((state)=> state.auth.user)

    const isTutor = user.user_type==='tutor'? true:false

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
                        {isTutor ? 
                            (
                            <>
                            <NavLink to="/dashboard/my_courses/" className="nav-item nav-link" >
                                <i className="fas fa-edit"></i> My Courses
                            </NavLink>
                            <NavLink to="/dashboard/add_experience/" className="nav-item nav-link" >
                                <i className="fas fa-edit"></i> Experiences and Expertice
                            </NavLink>
                            
                            </>
                            )
                            :
                            (
                            <>
                                <NavLink to="/dashboard/assignments/" className="nav-item nav-link" >
                                    <i className="fas fa-file-alt"></i> Assignments
                                </NavLink>
                                <NavLink to="/dashboard/my_courses/" className="nav-item nav-link" >
                                    <i className="fas fa-book"></i> My Courses
                                </NavLink>
                            </>
                            )
                        }
                        
                        <NavLink to="courses/" className="nav-item nav-link" >
                            <i className="fas fa-envelope"></i> Messages
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
