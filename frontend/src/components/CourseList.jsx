import React, { useEffect, useState } from 'react';
import api from '../api';
import {NavLink} from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesResponse = await api.get('courses/courses_list/');
                setCourses(coursesResponse.data);
            } catch (error) {
                console.log(error.response ? error.response.data : 'Error fetching courses');
            } finally {
                console.log("Fetch courses operation completed");
            }
        };
        fetchCourses();
    }, []);

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
                                        <small className="m-0"><i className="far fa-clock text-primary mr-2" />{course.duration}</small>
                                    </div>
                                    <a className="h5" href={`/course/${course.id}`}>{course.title}</a>
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
