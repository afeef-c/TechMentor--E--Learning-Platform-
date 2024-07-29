import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';

function AddLessons() {
    const dispatch = useDispatch();
    const { course_id } = useParams();
    const user = useSelector(state => state.auth.user);
    const authTokens = useSelector((state) => state.auth.authTokens);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        order: '',
        video_url: '',
        document_url: '',
        files: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isTutor = user && user.user_type === 'tutor';
    console.log("Course_id: ",course_id)
    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens, dispatch]);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: [...files],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (isTutor) {
            try {
                const data = new FormData();
                data.append('title', formData.title);
                data.append('content', formData.content);
                data.append('order', formData.order);
                data.append('course', course_id);
                data.append('video_url', formData.video_url);
                data.append('document_url', formData.document_url);

                formData.files.forEach(file => {
                    data.append('files', file);
                });

                await api.post(`/courses/lessons/${course_id}/`, data, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Lesson created successfully');
                setFormData({
                    title: '',
                    content: '',
                    order: '',
                    video_url: '',
                    document_url: '',
                    files: [],
                });
            } catch (error) {
                setError(error.response ? error.response.data : 'Error creating lesson');
                alert("Error creating lesson", error.response.data)
            } finally {
                setLoading(false);
                navigate('/dashboard/my_courses/');
            }
        } else {
            alert("Only tutors or admins can add new lessons");
            navigate('/');
        }
    };

    return (
        <div className="container">
            <h2>Add Lessons</h2>
            <div className="card-header-action">
                <NavLink to="/dashboard/add_category/" className="nav-item nav-link">
                    <i className="fas fa-book"></i> View Lessons
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
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Order</label>
                    <input
                        type="number"
                        className="form-control"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Video URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="video_url"
                        value={formData.video_url}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Document URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="document_url"
                        value={formData.document_url}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="section-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Upload Files</h4>
                                </div>
                                <div className="card-body">
                                    <form action="#" className="dropzone" id="mydropzone">
                                        <div className="fallback">
                                            <input name="files" type="file" multiple onChange={handleInputChange} />
                                        </div>
                                    </form>

                                </div>
                  
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Lesson'}
                </button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
}

export default AddLessons;
