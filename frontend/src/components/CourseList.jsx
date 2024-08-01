import React, { useEffect, useState } from 'react';
import api from '../api';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories, fetchCourses} from '../coursesSlice';

function CourseList() {
    
    const dispatch = useDispatch()
    const courses = useSelector((state) => state.courses.courses);
    const categories= useSelector((state)=> state.courses.categories);
    const status = useSelector((state) => state.courses.status);
    const error = useSelector((state) => state.courses.error);


    useEffect(() => {
        if (status === 'idle'){
            dispatch(fetchCourses())
            dispatch(fetchCategories())
        }
        
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    const imageStyle = {
        width: '100%',
        height: '200px', // Fixed height for consistency
        objectFit: 'cover', // Ensure image covers the container
        objectPosition: 'center' // Center the image within the container
    };

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="row">
                    {courses.map(course => (
                        
                        <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
                            <div className="rounded overflow-hidden mb-2">
                                <img className="img-fluid" 
                                src={course.image || "./src/assets/img/course-1.jpg"} 
                                alt={course.title}
                                style={imageStyle} />
                                <NavLink to={`/course_details/${course.id}/`}>
                                <div className="bg-secondary p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <small className="m-0"><i className="fa fa-users text-primary mr-2" />{course.student_count} Students</small>
                                        {course.is_active? <small className="m-0 p-2 badge badge-success">Active</small>:<small className="m-0 p-2 badge badge-warning"><i className="far fa-clock text-primary mr-2" />Coming Soon</small>}
                                        <small className="m-0"><i className="far fa-category text-primary mr-2" /> {categories[course.category-1] && categories[course.category-1].name}</small>
                                    </div>
                                    <p className="h5" href={`/course/${course.id}`}>{course.title}</p>
                                    <div className="border-top mt-4 pt-4">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{course.rating} <small>({course.reviews_count})</small></h6>
                                            <h5 className="m-0">₹{course.course_fee}</h5>
                                        </div>
                                    </div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseList;
