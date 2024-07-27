import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api';

function AddExperience() {
    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    //const [tutor,setTutor] = useState()
    const [formData, setFormData] = useState({
        experience: '',
        expertise: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //async function fetchTutorProfile() {
    //    try {
    //        const response = await api.get('users/tutor_profile/', {
    //        headers: {
    //            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    //        },
    //        });
    //        console.log('Tutor Profile:', response.data);
    //    } catch (error) {
    //        console.error('Error fetching tutor profile:', error.response ? error.response.data : error);
    //    }
    //    }

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
        if (user && user.user_type === 'tutor') {
            setFormData({
                experience: user.experience || '',
                expertise: user.expertise || '',
            });
 
            setLoading(false);
        } else {
            alert('Only tutors can access this page');
            navigate('/');
        }

    }, [authTokens, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = new FormData();

        try {
            const response = await api.put(`users/tutor_profile/`,updateData,{
                headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Tutor updated successfully', response.data);
            alert('Tutor Profile updated successfully');
        } catch (error) {
            console.error('Failed to update Tutor profile', error.response ? error.response.data : 'Error updating tutor');
            alert('Failed to update tutor profil');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="col-12">
            <div className="card">
                <form method="post" className="needs-validation" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="card-header">
                        <h4>Experiences And Expertise</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group">
                                <label>Your Area Of Expertise</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="expertise"
                                    value={formData.expertise}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-12">
                                <label>Add Your Experiences</label>
                                <textarea
                                    className="form-control summernote-simple"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    {loading && <p>Loading...</p>}  

                    <div className="card-footer text-right">
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExperience;
