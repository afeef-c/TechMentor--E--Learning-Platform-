import React from 'react';
import { NavLink } from 'react-router-dom';

function DashSideNavbar() {
  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="/"><span className="text-primary">Tech</span>Mentor</a>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <NavLink to="/"><span className="text-primary">T</span>M</NavLink>
        </div>

        <ul className="sidebar-menu">
          <li className="menu-header">Admin Dashboard</li>
          <li className="dropdown">
            <a  className="nav-link has-dropdown"><i className="fas fa-fire" /><span>Users</span></a>
            <ul className="dropdown-menu">
              <li><NavLink to="students" className="nav-link">Students</NavLink></li>
              <li><NavLink to="tutors" className="nav-link">Tutors</NavLink></li>
            </ul>
          </li>
          <li className="dropdown">
            <a  className="nav-link has-dropdown"><i className="fas fa-fire" /><span>Courses</span></a>
            <ul className="dropdown-menu">
              <li><NavLink to="/admin_dashboard/courses" className="nav-link">Courses</NavLink></li>
              <li><NavLink to="/admin_dashboard/students" className="nav-link">Manage Courses</NavLink></li>
              <li><NavLink to="/admin_dashboard/create_course" className="nav-link">Create Course</NavLink></li>
            </ul>
          </li>
        </ul>
        
        <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
          <a href="" className="btn btn-primary btn-lg btn-block btn-icon-split">
            <i className="fas fa-rocket" /> Documentation
          </a>
        </div>
      </aside>
    </div>
  );
}

export default DashSideNavbar;
