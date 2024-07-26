import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import api from '../api';
import {ACCESS_TOKEN} from '../constants';
import {useDispatch,useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom';


function CoursesList() {
    const [courses, setCourses] = useState([])
    const authTokens = useSelector(state => state.auth.authTokens);
    const access = localStorage.getItem(ACCESS_TOKEN)
    
    const fetchCourseList = async () => {
        if (access) {
            
            try {
                const response = await api.get('/courses/', {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
                });
                setCourses(response.data);
                console.log('Courses list:',response.data)

            } catch (error) {
                console.error('Failed to fetch users list:', error);
            }
        }
    };


    useEffect(() => {

        fetchCourseList()
        
    }, [access])

  return (
    <div className="main-content">
        
        
        <div className="row">
            <div className="col-md">
                <div className="card">
                <div className="card-header">
                    <h4>Courses</h4>
                    <div className="card-header-action">
                    <a href="#" className="btn btn-danger">View More <i className="fas fa-chevron-right" /></a>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Tutor</th>
                            <th>Action</th>
                        </tr>
                        {courses.map(course=>(
                                <tr>
                                    <td><a href="#">{course.id}</a></td>
                                    <td className="font-weight-600">{course.title}</td>
                                    <td><div className="badge badge-warning">{course.is_active ? 'Active' : 'Inactive'}</div></td>
                                    <td>{course.tutor}</td>
                                    <td>
                                    <NavLink  to={`/admin_dashboard/edit_course/${course.id}`} className="btn btn-primary">Detail</NavLink>
                                    </td>
                                </tr>
                            ))}
                        
                        </tbody></table>
                    </div>
                </div>
                </div>
            </div>  
        </div>


    </div>
  )
}

export default CoursesList

