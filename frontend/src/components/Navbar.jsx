import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, logoutUser } from '../authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens, dispatch]);

    const getDashboardLink = () => {
        if (user) {
            switch (user.user_type) {
                case 'admin':
                    return '/admin_dashboard/';
                case 'tutor':
                    return '/dashboard/bio/';
                default:
                    return '/dashboard/bio/';
            }
        }
        return '#'; // Default link if user is not defined
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <div className="col-lg-2">
                    <NavLink to="/" className="text-decoration-none">
                        <h1 className="m-0"><span className="text-primary">Tech</span>Mentor</h1>
                    </NavLink>
                </div>
                <div className="col-lg-8">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <button
                            type="button"
                            className="navbar-toggler"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav py-0">
                                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                                <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                                <NavLink to="/courses" className="nav-item nav-link">Courses</NavLink>
                                <NavLink to="/tutors" className="nav-item nav-link">Tutors</NavLink>
                                <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                            </div>
                            {user ? (
                                <div className="dropdown">
                                    <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user mr-5">
                                        <img
                                            alt="profile"
                                            src={user.profile_pic ? user.profile_pic : './assets/img/avatar/avatar-1.png'}
                                            className="rounded-circle mr-1"
                                        />
                                        <div className="d-sm-none d-lg-inline-block " style={{ color: 'black' }}>Hi {user.username}</div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-title">Logged in 5 min ago</div>
                                        <a href={getDashboardLink()} className="dropdown-item has-icon">
                                            <i className="far fa-user" /> Profile
                                        </a>
                                        <a href="/cart" className="dropdown-item has-icon">
                                            <i className="fas fa-shopping-cart" />Cart
                                        </a>
                                        <a href="/wishlist" className="dropdown-item has-icon">
                                            <i className="fas fa-heart" /> Wishlist
                                        </a>
                                        <div className="dropdown-divider" />
                                        <button onClick={handleLogout} className="dropdown-item text-danger">
                                            <i className="fas fa-sign-out-alt" /> Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <NavLink to="/login" className="btn btn-primary py-2 px-4 ml-auto d-none d-lg-block">
                                    Join Now
                                </NavLink>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
