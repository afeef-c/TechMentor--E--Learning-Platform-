import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';

function UpdateLesson() {
  const dispatch = useDispatch();
  const { course_id, lesson_id } = useParams();
  const user = useSelector(state => state.auth.user);
  const authTokens = useSelector(state => state.auth.authTokens);
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

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/courses/lessons/${lesson_id}/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log("response : ",response)
        setFormData({
          title: response.data.title,
          content: response.data.content,
          order: response.data.order,
          video_url: response.data.video_url,
          document_url: response.data.document_url,
          files: response.data.files || [],
        });
      } catch (error) {
        setError(error.response ? error.response.data : 'Error fetching lesson details');
      } finally {
        setLoading(false);
      }
    };

    if (authTokens) {
      dispatch(fetchUserDetails());
      fetchLessonDetails();
    }
  }, [authTokens, dispatch, lesson_id]);

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

        await api.put(`/courses/lessons/${lesson_id}/`, data, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Lesson updated successfully');
        navigate(`/dashboard/my_courses/${course_id}/lessons/`);
      } catch (error) {
        setError(error.response ? error.response.data : 'Error updating lesson');
      } finally {
        setLoading(false);
      }
    } else {
      alert("Only tutors or admins can update lessons");
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Update Lesson</h2>
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
        <div className="form-group">
          <label>Files</label>
          <input
            type="file"
            className="form-control"
            name="files"
            onChange={handleInputChange}
            multiple
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Lesson'}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}

export default UpdateLesson;
