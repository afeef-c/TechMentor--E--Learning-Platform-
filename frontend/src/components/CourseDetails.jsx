import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchCourses } from '../coursesSlice';
import {fetchUsers} from '../usersSlice';

function CourseDetails() {
    const { course_id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tutors, setTutors] = useState({});
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const categories = useSelector((state) => state.courses.categories);
    const users = useSelector((state)=> state.users.users)
    const status = useSelector((state) => state.courses.status);
    const error = useSelector((state) => state.courses.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
            dispatch(fetchCategories());
            dispatch((fetchUsers()))
        }
    }, [status, dispatch]);
    console.log(users)
    useEffect(() => {
        if (status === 'succeeded') {
            const selectedCourse = courses.find(course => course.id === parseInt(course_id));
            setCourse(selectedCourse);
            setLoading(false);
        }
    }, [status, courses, course_id]);
    
    if (loading) return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;
    if (!course) return <div>Course not found</div>;

    return (
        <>
            <div className="container-fluid page-header" style={{ marginBottom: 90 }}>
                <div className="container">
                    <div className="d-flex flex-column justify-content-center" style={{ minHeight: 300 }}>
                        <h3 className="display-4 text-white text-uppercase">Course Details</h3>
                        <div className="d-inline-flex text-white">
                            <p className="m-0 text-uppercase"><a className="text-white" href="/">Home</a></p>
                            <i className="fa fa-angle-double-right pt-1 px-3" />
                            <p className="m-0 text-uppercase">Course Details</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="mb-5">
                                <h6 className="text-primary mb-3">Jan 01, 2050</h6>
                                <h1 className="mb-5">{course.title}</h1>
                                <img className="img-fluid rounded w-100 mb-4" src={course.image || "/src/assets/img/course-1.jpg"} alt="Course" />
                                <p>{course.description}</p>
                                
                            </div>
                        </div>

                        <div className="col-lg-4 mt-5 mt-lg-0">
                            <div className="d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                                <img src={users[course.tutor]?.profile_pic || "/src/assets/img/team-2.jpg"} className="img-fluid rounded-circle mx-auto mb-3" style={{ width: 100 }} alt="Tutor" />
                                <h3 className="text-white mb-3">{users[course.tutor]?.username}</h3>
                                <p className="text-white m-0">{users[course.tutor]?.bio}</p>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4" style={{ letterSpacing: 5 }}>Category</h3>
                                <div className="d-flex flex-wrap m-n1">
                                    <a href="/" className="btn btn-primary m-1">{categories[course.category]?.name}</a>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4" style={{ letterSpacing: 5 }}>Recent Post</h3>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-1.jpg" style={{ width: 100 }} alt="Blog" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Diam amet eos at no eos</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-2.jpg" style={{ width: 100 }} alt="Blog" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Diam amet eos at no eos</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-3.jpg" style={{ width: 100 }} alt="Blog" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Diam amet eos at no eos</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-1.jpg" style={{ width: 100 }} alt="Blog" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Diam amet eos at no eos</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-2.jpg" style={{ width: 100 }} alt="Blog" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Diam amet eos at no eos</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetails;
