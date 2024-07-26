import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function CreateCourse() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [error, setError] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [tutor, setTutor] = useState('');
  const navigate = useNavigate();

  const isAdmin = user?.user_type === 'admin';

  useEffect(() => {
    if (isAdmin) {
      const fetchTutors = async () => {
        try {
          const response = await api.get('/users/users_list/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setTutors((response.data).filter(user => user.user_type === 'tutor'));
          
        } catch (error) {
          console.error('Error fetching tutors', error);
        }
      };

      fetchTutors();
    }
  }, [isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      course_fee: parseFloat(courseFee),
      tutor: isAdmin ? tutor : user?.id, // Assign tutor based on user role
    };

    try {
      const response = await api.post('/courses/', courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Course created successfully', response.data);
      navigate('/admin_dashboard/courses'); // Navigate to course list page or any other page after success
    } catch (error) {
      setError(error.response ? error.response.data : 'Error creating course');
    }
  };

  return (
    <div className='main-content'>
      <h1>Create Course</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="courseFee">Course Fee:</label>
          <input
            type="number"
            className="form-control"
            id="courseFee"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
            required
          />
        </div>
        {isAdmin && (
          <div className="form-group">
            <label htmlFor="tutor">Tutor:</label>
            <select
              className="form-control"
              id="tutor"
              value={tutor}
              onChange={(e) => setTutor(e.target.value)}
              required
            >
              <option value="" disabled>Select a tutor</option>
              {tutors.map(tutor => (
                <option key={tutor.id} value={tutor.username}>
                  {tutor.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
