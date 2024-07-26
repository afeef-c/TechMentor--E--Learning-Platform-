import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

function EditUser() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    user_type: '',
    // Add other fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`users/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setFormData({
          username: response.data.username,
          email: response.data.email,
          user_type: response.data.user_type,
          
        });
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : 'Error fetching user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`users/profile/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log('User updated successfully', response.data);
      // Optionally, you can update the state or show a success message
    } catch (error) {
      console.error('Failed to update user', error.response ? error.response.data : 'Error updating user');
      // Optionally, show an error message
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(formData.is_active, formData.username);

  return (
    <div className="main-content">
      <h1>Edit User</h1>
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <h4>{formData.user_type} Details</h4>
            </div>
            {error && <p>Error: {error}</p>}
            <div className="card-body">
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
              </div>
              
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

export default EditUser;
