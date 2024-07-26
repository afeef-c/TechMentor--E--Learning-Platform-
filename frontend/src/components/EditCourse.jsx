import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function EditCourse() {
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    tutor: '',
    is_active: false,
  });

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        
        setFormData({
          title: response.data.title,
          tutor: response.data.tutor,
          is_active: response.data.is_active,
        });
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : 'Error fetching course details');
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const updateCourse = async (id, data) => {
    return api.put(`courses/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCourse(courseId, formData);
      setCourse(response.data);
      alert('Course updated successfully');
    } catch (error) {
      alert('Error updating course');
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (name === 'is_active') {
      try {
        const response = await api.patch(`courses/${courseId}/activate/`, { is_active: newValue }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setCourse(response.data);
        alert('Course activation status updated successfully');
      } catch (error) {
        alert('Error updating activation status');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="main-content">
      <h1>Edit Course</h1>
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleUpdate}>
            <div className="card-header">
              <h4>Course Details</h4>
            </div>
            {error && <p>Error: {error}</p>}
            <div className="card-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tutor</label>
                <input
                  type="text"
                  name="tutor"
                  value={formData.tutor}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <label className="custom-switch mt-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active || false}
                  onChange={handleChange}
                  className="custom-switch-input"
                />
                <span className="custom-switch-indicator" />
                <span className="custom-switch-description">Active</span>
              </label>
            </div>
            <div className="card-footer text-right">
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
