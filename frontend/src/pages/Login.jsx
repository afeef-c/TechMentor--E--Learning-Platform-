import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserDetails, loginUser } from '../authSlice'; // Adjust the import path as needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (user.user_type === "admin") {
        window.location.href = "/admin_dashboard";
      } else if (user.user_type === "tutor") {
        window.location.href = "/admin_dashboard";
      } else {
        window.location.href = '/';
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      toast.success("Login successful!");
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="text-center mb-5">
        <h1>Login</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="contact-form bg-secondary rounded p-5">
            <div id="success" />
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="control-group p-4">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className='form-control border-0 p-4'
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="control-group p-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className='form-control border-0 p-4'
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='text-center p-4'>
                <button type="submit" className="btn btn-primary py-3 px-5 p">Login</button>
                {loading && <p>Loading...</p>}  
              </div>
              <div className='text-center p-4'>
                <p>Don't have an account? <Link to='/register' className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>Signup</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
