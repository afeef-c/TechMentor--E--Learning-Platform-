import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchCourses } from '../coursesSlice';
import { fetchUsers } from '../usersSlice';
import { fetchUserDetails } from '../authSlice';
import { addToCart } from '../cartSlice';

function CourseDetails() {
    const { course_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const courses = useSelector((state) => state.courses.courses);
    const categories = useSelector((state) => state.courses.categories);
    const users = useSelector((state) => state.users.users);
    const coursesStatus = useSelector((state) => state.courses.status);
    const usersStatus = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.cart.error);

    useEffect(() => {
        if (coursesStatus === 'idle') {
            dispatch(fetchCourses());
            dispatch(fetchCategories());
            dispatch(fetchUserDetails());
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [coursesStatus, usersStatus, dispatch]);

    useEffect(() => {
        if (coursesStatus === 'succeeded' && usersStatus === 'succeeded') {
            setLoading(false);
        }
    }, [coursesStatus, usersStatus]);

    const course = courses.find(course => course.id === parseInt(course_id));

    const handleAddToCart = () => {
        if (user) {
            dispatch(addToCart({ courseId: course.id, priceAtAddition: course.course_fee }))
                .unwrap()
                .then(() => {
                    setMessage('Course added to cart successfully!');
                })
                .catch((error) => {
                    if (error.detail === 'Item already in cart.') {
                        setMessage('Course is already in your cart.');
                    } else {
                        setMessage('Failed to add course to cart.');
                    }
                });
        } else {
            alert('Please log in to add to cart.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (coursesStatus === 'failed' || usersStatus === 'failed') return <div>Error: {error}</div>;
    if (!course) return <div>Course not found</div>;

    const category = categories.find(category => category.id === course.category);
    const tutor = Object.values(users).find(user => user.id === course.tutor);

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

                            <div className="mb-5 d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                                <h4 className="text-uppercase mb-4">Course Fee: ₹{course.course_fee}</h4>

                                {course.is_active ? (
                                    <>
                                        <button className="btn btn-primary mb-2">Start Subscription</button>
                                        <button onClick={handleAddToCart} className="btn btn-outline-dark">Add to Cart</button>
                                        {message && <p>{message}</p>}
                                    </>
                                ) : <p>Available soon</p>}
                                <button className="btn btn-outline-dark">Add To Wishlist</button>
                            </div>
                        </div>

                        <div className="col-lg-4 mt-5 mt-lg-0">
                            <div className="d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                                <img src={tutor?.profile_pic || "/src/assets/img/team-2.jpg"} className="img-fluid rounded-circle mx-auto mb-3" style={{ width: 100 }} alt="Tutor" />
                                <h3 className="text-white mb-3">{tutor?.username}</h3>
                                <p className="text-white m-0">{tutor?.bio}</p>
                            </div>

                            <div className="mb-5">
                                <h5 className="text-uppercase mb-4" style={{ letterSpacing: 5 }}>Category: <a href="/" className="btn btn-primary m-1">{category?.name}</a></h5>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4" style={{ letterSpacing: 5 }}>Lessons</h3>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-1.jpg" style={{ width: 100 }} alt="Lesson" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Lesson 1</h6>
                                        <small className="text-uppercase text-white">Jan 01, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-2.jpg" style={{ width: 100 }} alt="Lesson" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Lesson 2</h6>
                                        <small className="text-uppercase text-white">Jan 02, 2050</small>
                                    </div>
                                </a>
                                <a className="d-flex align-items-center text-decoration-none bg-secondary rounded mb-3 overflow-hidden" href="/">
                                    <img className="img-fluid" src="img/blog-3.jpg" style={{ width: 100 }} alt="Lesson" />
                                    <div className="pl-3">
                                        <h6 className="text-white">Lesson 3</h6>
                                        <small className="text-uppercase text-white">Jan 03, 2050</small>
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
