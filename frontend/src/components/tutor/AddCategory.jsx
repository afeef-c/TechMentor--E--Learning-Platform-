import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api';
import {useNavigate} from 'react-router-dom';

function AddCategory() {
    const [formData, setFormData] = useState({ name: '', image: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            if (formData.image) {
                data.append('image', formData.image);
            }

            await api.post('/courses/course_categories/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Category created successfully');
            setFormData({ name: '', image: null });
        } catch (error) {
            setError(error.response ? error.response.data : 'Error creating category');
        } finally {
            setLoading(false);
            navigate('/dashboard/add_course/')
        }
    };

    return (
        <div className="container">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
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
                    {loading ? 'Creating...' : 'Create Category'}
                </button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
    );
}

export default AddCategory;
