import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';
import {NavLink} from 'react-router-dom';

function MyCourses() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const authTokens = useSelector((state) => state.auth.authTokens);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoursesAndCategories = async () => {
            try {
                const coursesResponse = await api.get('courses/tutor_courses/', {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                });
                setCourses(coursesResponse.data);

                const categoriesResponse = await api.get('courses/course_categories/', {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                });
                const categoriesData = categoriesResponse.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategories(categoriesData);

            } catch (error) {
                setError(error.response ? error.response.data : 'Error fetching courses or categories');
            } finally {
                setLoading(false);
            }
        };

        if (authTokens) {
            dispatch(fetchUserDetails());
            fetchCoursesAndCategories();
        }
    }, [authTokens, dispatch]);

    console.log("My courses: ", courses);
    console.log("Categories: ", categories);

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Your Courses</h4>
                            
                            <div className="card-header-action">
                                <NavLink to="/dashboard/add_course/" className="nav-item nav-link" >
                                    <i className="fas fa-book"></i> Add Course
                                </NavLink>
                            </div>
                            
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-striped" id="sortable-table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">
                                                ID
                                            </th>
                                            <th>Course Name</th>
                                            <th>Category</th>
                                            <th>Course Fee</th>
                                        
                                            <th>Due Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map(course => (
                                            <tr key={course.id}>
                                                <td>
                                                    {course.id}
                                                </td>
                                                <td>{course.title}</td>
                                                <td>{categories[course.category]}</td>
                                                <td className="align-middle">
                                                    {course.course_fee}
                                                </td>
                                                <td>
                                                    <img alt="avatar" src={course.image} className="rounded-circle" width={35} data-toggle="tooltip" title="Wildan Ahdian" />
                                                </td>
                                                <td>
                                                    <div className={`badge ${course.is_active ? 'badge-success' : 'badge-danger'}`}>
                                                        {course.is_active ? 'Active' : 'Inactive'}
                                                    </div>
                                                </td>
                                                <td><a href="#" className="btn btn-secondary">Detail</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default MyCourses;
