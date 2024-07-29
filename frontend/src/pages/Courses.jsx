import React, { useEffect, useState } from 'react';
import CourseCategories from '../components/CourseCategories';
import CourseList from '../components/CourseList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../authSlice';
import api from '../api';

function Courses() {
    const dispatch = useDispatch();
    const authTokens = useSelector((state) => state.auth.authTokens);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens,fetchUserDetails]);

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens, dispatch]);


  return (
    <div>
        <div className="container-fluid page-header" style={{marginBottom: 90}}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center" style={{minHeight: 300}}>
                    <h3 className="display-4 text-white text-uppercase">Courses</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0 text-uppercase"><a className="text-white" href>Home</a></p>
                        <i className="fa fa-angle-double-right pt-1 px-3" />
                        <p className="m-0 text-uppercase">Courses</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <h5 className="text-primary text-uppercase " style={{letterSpacing: 5}}>Categories</h5>
        </div>
        <CourseCategories/>

        <div className="text-center">
            <h5 className="text-primary text-uppercase " style={{letterSpacing: 5}}>Courses</h5>
        </div>
        <CourseList/>


    </div>
  )
}

export default Courses
