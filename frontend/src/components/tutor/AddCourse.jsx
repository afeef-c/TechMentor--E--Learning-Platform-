import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';

function AddCourse() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const authTokens = useSelector((state) => state.auth.authTokens);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tutor: '',
        category: '',
        course_fee: 0.00,
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isTutor = user && user.user_type === 'tutor';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/courses/course_categories/', {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error.response ? error.response.data : error);
            }
        };

        if (authTokens) {
            dispatch(fetchUserDetails());
        }
        if (isTutor) {
            fetchCategories();
        }
    }, [authTokens, dispatch, isTutor]);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (isTutor) {
            try {
                const data = new FormData();
                data.append('title', formData.title);
                data.append('description', formData.description);
                data.append('tutor', user.id);
                data.append('category', formData.category);
                data.append('course_fee', formData.course_fee);
                if (formData.image) {
                    data.append('image', formData.image);
                }

                await api.post('/courses/', data, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Course created successfully');
                setFormData({
                    title: '',
                    description: '',
                    tutor: user.id,
                    category: '',
                    course_fee: 0.00,
                    image: null,
                });
            } catch (error) {
                setError(error.response ? error.response.data : 'Error creating course');
            } finally {
                setLoading(false);
                navigate('/dashboard/my_courses/')
            }
        } else {
            alert("Only tutors or admins can add new courses");
            navigate('/');
        }
    };

    return (
        <div className="container">
            <h2>Add Course</h2>
            <div className="card-header-action">
                <NavLink to="/dashboard/add_category/" className="nav-item nav-link" >
                    <i className="fas fa-book"></i> Add Course Categories
                </NavLink>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course Fee</label>
                    <input
                        type="number"
                        className="form-control"
                        name="course_fee"
                        value={formData.course_fee}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Course'}
                </button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
}

export default AddCourse;
