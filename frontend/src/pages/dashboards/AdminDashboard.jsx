import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import DashNavbar from '../../components/admin/DashNavbar';
import DashSideNavbar from '../../components/admin/DashSideNavbar';
import { Outlet } from 'react-router-dom';


function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <DashNavbar />
      <DashSideNavbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default AdminDashboard;
