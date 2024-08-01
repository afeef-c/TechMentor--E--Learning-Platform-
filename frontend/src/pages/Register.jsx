import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2:'',
        user_type:'student'
    });
    const [otpData, setOtpData] = useState({
        userId: '',
        otp: '',
    });

    const [step, setStep] = useState('register');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e) => {
        setOtpData({ ...otpData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 

        if (formData.password !== formData.password2) {
            
          toast.error("Passwords don't match");
          setError("Passwords don't match");
          setLoading(false);
          return;
        }

        try {
            const response = await api.post('/users/register/', formData);
            toast.success(response.data.message);
            setMessage(response.data.message);
            setOtpData({ ...otpData, userId: response.data.user_id });
            setStep('verify');
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred during registration.')
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!otpData.userId || !otpData.otp) {
            toast.error('User ID and OTP are required');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/users/verify-otp/', otpData);
            toast.success(response.data.message);
            // Optionally, redirect to login page or dashboard here
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred during OTP verification.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1>User Registration</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form bg-secondary rounded p-5">
                            {step === "register" ? (
                                <form onSubmit={handleRegister} className="auth-form">
                                    <div className="control-group p-2">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control border-0 p-4"
                                            id="username" name="username" placeholder="Username" value={formData.username}
                                            onChange={handleChange} required
                                        />
                                    </div>
                                    <div className="control-group p-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control border-0 p-4" id="email" name="email"
                                            placeholder="Email" value={formData.email} onChange={handleChange} required
                                        />
                                    </div>
                                    <div className="control-group p-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control border-0 p-4" id="password" name="password"
                                            placeholder="Password" value={formData.password} onChange={handleChange} required
                                        />
                                    </div>
                                    
                                    <div className="control-group p-2">
                                        <label htmlFor="password2">Confirm Password</label>
                                        <input type="password" className="form-control border-0 p-4" id="password2" name="password2"
                                            placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required
                                        />
                                    </div>
                                    <div className="control-group p-2">
                                        <label htmlFor="user_type">User Type</label>
                                        <select className="form-control border-0" id="user_type" name="user_type"
                                            value={formData.user_type} onChange={handleChange} required
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
                            ) : (
                                <form onSubmit={handleVerifyOtp} className="auth-form">
                                    <div className="control-group p-2">
                                        <label htmlFor="otp">OTP</label>
                                        <input type="text" className="form-control border-0 p-4"
                                            id="otp" name="otp" value={otpData.otp} onChange={handleOtpChange}
                                            placeholder="Enter OTP" required
                                        />
                                    </div>

                                    <div className="text-center p-5">
                                        <button type="submit" className="btn btn-primary py-3 px-5" disabled={loading}>
                                            Verify OTP
                                        </button>
                                        {loading && <p>Loading...</p>}
                                        {error && <p className="text-danger">{error}</p>}
                                    </div>
                                </form>
                            )}

                          

                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Register;
