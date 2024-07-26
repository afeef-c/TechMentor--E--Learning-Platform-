import AuthContext from '../../context/AuthContext'
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserDetails,logoutUser} from '../../authSlice';
import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function DashNavbar() {
    //const {user} = useContext(AuthContext)
    const dispatch = useDispatch()
    const user = useSelector(state=> state.auth.user)
    const authTokens = useSelector((state) => state.auth.authTokens);
    const navigate = useNavigate()

    useEffect(()=>{
      if (authTokens){
        dispatch(fetchUserDetails())
      }
    },[authTokens, dispatch])

    
    const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/login');
    };

  return (
    <>
     <div id="app">
        <div className="main-wrapper main-wrapper-1">
            <div className="navbar-bg">
                <nav className="navbar navbar-expand-lg main-navbar">

                    
                    <ul className="navbar-nav navbar-right mr-auto">
                        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg mr-5"><i className="fas fa-bars" /></a></li>
                        <li className='mr-5'><h2> Admin Dashboard</h2></li>
                        <li className="dropdown dropdown-list-toggle mr-5"><a href="#" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle beep"><i className="far fa-envelope" /></a>
                            <div className="dropdown-menu dropdown-list dropdown-menu-right">
                                <div className="dropdown-header">Messages
                                    <div className="float-right">
                                        <a href="#">Mark All As Read</a>
                                    </div>
                                </div>
                                <div className="dropdown-list-content dropdown-list-message">
                                    <a href="#" className="dropdown-item dropdown-item-unread">
                                        <div className="dropdown-item-avatar">
                                        <img alt="image" src="assets/img/avatar/avatar-1.png" className="rounded-circle" />
                                        <div className="is-online" />
                                        </div>
                                        <div className="dropdown-item-desc">
                                        <b>Kusnaedi</b>
                                        <p>Hello, Bro!</p>
                                        <div className="time">10 Hours Ago</div>
                                        </div>
                                    </a>
                                </div>
                                <div className="dropdown-footer text-center">
                                <a href="#">View All <i className="fas fa-chevron-right" /></a>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown dropdown-list-toggle mr-5"><a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep"><i className="far fa-bell" /></a>
                            <div className="dropdown-menu dropdown-list dropdown-menu-right">
                                <div className="dropdown-header">Notifications
                                <div className="float-right">
                                    <a href="#">Mark All As Read</a>
                                </div>
                                </div>
                                <div className="dropdown-list-content dropdown-list-icons">
                                <a href="#" className="dropdown-item dropdown-item-unread">
                                    <div className="dropdown-item-icon bg-primary text-white">
                                    <i className="fas fa-code" />
                                    </div>
                                    <div className="dropdown-item-desc">
                                    Template update is available now!
                                    <div className="time text-primary">2 Min Ago</div>
                                    </div>
                                </a>
                                
                                </div>
                                <div className="dropdown-footer text-center">
                                <a href="#">View All <i className="fas fa-chevron-right" /></a>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user mr-5">
                            <img alt="image" src="assets/img/avatar/avatar-1.png" className="rounded-circle mr-1" />
                            <div className="d-sm-none d-lg-inline-block">Hi {user.username}</div></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-title">Logged in 5 min ago</div>
                            <a href="features-profile.html" className="dropdown-item has-icon">
                            <i className="far fa-user" /> Profile
                            </a>
                            <a href="features-activities.html" className="dropdown-item has-icon">
                            <i className="fas fa-bolt" /> Activities
                            </a>
                            <a href="features-settings.html" className="dropdown-item has-icon">
                            <i className="fas fa-cog" /> Settings
                            </a>
                            <div className="dropdown-divider" />
                            <a onClick={handleLogout} className="dropdown-item has-icon text-danger">
                            <i className="fas fa-sign-out-alt" /> Logout
                            </a>
                        </div>
                        </li>
                    </ul>
                </nav>
            </div>


        </div>
    </div> 
    </>
  )
}

export default DashNavbar
