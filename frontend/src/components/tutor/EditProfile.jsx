import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';

function EditProfile() {

    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      profile_pic: null,
      first_name: '',
      last_name: '',
      phone: '',
      bio: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (authTokens) {
        dispatch(fetchUserDetails());
      }

      if (user) {
        setFormData({
          username: user.username,
          email: user.email,
          profile_pic: null,
          first_name: user.first_name,
          last_name: user.last_name,
          bio: user.bio,
          phone: user.phone,
        });
        setLoading(false);
      } else {
        setError('Error fetching user details');
        setLoading(false);
      }
    }, [authTokens, dispatch]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        profile_pic: e.target.files[0],
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updateData = new FormData();

      Object.keys(formData).forEach((key) => {
          if (key === 'profile_pic' && !formData[key]) {
          return; // Skip appending profile_pic if not selected
          }
          updateData.append(key, formData[key]);
      });

      try {
          const response = await api.put(`users/profile/${user.id}/`, updateData, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'multipart/form-data',
          },
          });
          console.log('User updated successfully', response.data);
          alert('Profile updated successfully');
      } catch (error) {
          console.error('Failed to update user', error.response ? error.response.data : 'Error updating user');
          alert('Failed to update profile');
      }
      };


    return (
      <div className="col-12">
        <div className="card">
          <form method="post" className="needs-validation" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card-header">
              <h4>Edit Profile</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-6 col-12">
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    You can edit the User Name if needed
                  </div>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label>Profile Pic</label>
                  <input type="file" className="form-control" name="profile_pic" onChange={handleFileChange} />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-12">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">Please fill in the first name</div>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">Please fill in the last name</div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-12">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">Please fill in the email</div>
                </div>
                <div className="form-group col-md-6 col-12">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label>Bio</label>
                  <textarea
                    className="form-control summernote-simple"
                    name="bio"
                    value={formData.bio}
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

export default EditProfile;
