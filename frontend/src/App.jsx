import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TutorsPage from './pages/TutorsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import Courses from './pages/Courses';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Logout from './components/Logout';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';
import TutorsList from './components/TutorsList';
import StudentsList from './components/StudentsList';
import EditUser from './components/admin/EditUser';
import CreateCourse from './components/CreateCourse';
import CoursesList from './components/CoursesList';
import EditCourse from './components/EditCourse';
import TutorDashboard from './pages/dashboards/TutorDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UserIntro from './pages/dashboards/UserIntro';
import EditProfile from './components/tutor/EditProfile';
import DashBoardRoute from './components/DashBoardRoute';
import AddExperience from './components/tutor/AddExperience';
import CreateCourseTutor from './components/tutor/AddCourse';
import AddCategory from './components/tutor/AddCategory';
import AddCourse from './components/tutor/AddCourse';
import MyCourses from './components/tutor/MyCourses';

function App() {
  const isAdminDashboard = window.location.pathname.includes('admin_dashboard');
  const isDashboard = window.location.pathname.includes('dashboard')
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <AuthProvider>
        {!isAdminDashboard && <Navbar />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin_dashboard/*' element={<AdminRoute><AdminDashboard /></AdminRoute>}>
            <Route path='students' element={<StudentsList />} />
            <Route path='editUser/:userId' element={<EditUser />} />
            <Route path='tutors' element={<TutorsList />} />
            <Route path='create_course' element={<CreateCourse />} />
            <Route path='courses' element={<CoursesList />} />
            <Route path='edit_course/:courseId' element={<EditCourse />} />
          
          </Route>
          <Route path='/dashboard/*' element={<DashBoardRoute><TutorDashboard /></DashBoardRoute>}>
            <Route path='bio' element={<UserIntro />} />
            <Route path='edit_profile' element={<EditProfile />} />
            <Route path='add_experience' element={<AddExperience />} />
            <Route path='my_courses' element={<MyCourses />} />
            <Route path='add_category' element={<AddCategory />} />
            <Route path='add_course' element={<AddCourse />} />
            
          </Route>
          {/*<Route path='/student_dashboard/*' element={<DashBoardRoute><StudentDashboard /></DashBoardRoute>} >
            <Route path='bio' element={<UserIntro />} />
            <Route path='edit_profile' element={<EditProfile />} />
          
          </Route>*/}
          <Route path='/about' element={<AboutPage />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/tutors' element={<TutorsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<Login />} />
          <Route path="/logout" element={<PublicRoute><Logout /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='*' element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
        {!isAdminDashboard && !isDashboard && <Footer />}
      </AuthProvider>
    </Router>
  );
}

export default App;
