import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // Adjust the import path as needed
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'; // Adjust the import path as needed

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userType, setUserType] = useState('student'); // Default to 'student'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== password2) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/register/', { 
        username, 
        email, 
        password, 
        user_type: userType 
      });
      
      if (response.data) {
        // Register successful, now log in the user
        const loginResponse = await api.post('/users/login/', { 
          username, 
          password 
        });
        
        if (loginResponse.data) {
          localStorage.setItem(ACCESS_TOKEN, loginResponse.data.access);
          localStorage.setItem(REFRESH_TOKEN, loginResponse.data.refresh);
          console.log("Registered and logged in successfully!!");
          navigate("/");
        }
      }
    } catch (error) {
      // Check for error response and extract message
      const errorMessage = error.response?.data?.detail || 'Something went wrong';
      setError('Registration failed: ' + errorMessage);
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1>Register</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form bg-secondary rounded p-5">
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="control-group p-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="control-group p-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control border-0 p-4"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="control-group p-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control border-0 p-4"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="control-group p-2">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control border-0 p-4"
                    id="password2"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </div>
                <div className="control-group p-2">
                  <label htmlFor="user_type">User Type</label>
                  <select
                    className="form-control border-0 "
                    id="user_type"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                  </select>
                </div>
                

                <div className="text-center p-5">
                  <button type="submit" className="btn btn-primary py-3 px-5" disabled={loading}>
                    Register
                  </button>
                  {loading && <p>Loading...</p>}
                  {error && <p className="text-danger">{error}</p>}
                </div>
                <div className='text-center p-4'>
                  <p>Already have an account? <Link to='/login' className="text-primary text-uppercase mb-3" style={{ letterSpacing: 5 }}>Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Register;
