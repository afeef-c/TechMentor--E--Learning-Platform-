import React, { useEffect, useState } from 'react';
import api from '../api';

function CourseCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await api.get('courses/categories_list/');
                setCategories(categoriesResponse.data);
                console.log("categories: ", categoriesResponse.data);
            } catch (error) {
                console.log(error.response ? error.response.data : 'Error fetching categories');
            } finally {
                console.log("Fetch categories operation completed");
            }
        };
        fetchCategories();
    }, []);

    const imageStyle = {
        width: '100%',
        height: '100px', // Fixed height for consistency
        objectFit: 'cover', // Ensure image covers the container
        objectPosition: 'center' // Center the image within the container
    };

    return (
        <div className="container-fluid py-5">
            <div className="container pt-5 pb-3">
                <div className="row">
                    {categories.map(category => (
                        <div className="col-lg-3 col-md-6 mb-4" key={category.id}>
                            <div className="cat-item position-relative overflow-hidden rounded mb-2">
                                <img
                                    className="img-fluid"
                                    src={category.image || "./src/assets/img/cat-1.jpg"} // Update this with category-specific image URL
                                    alt={category.name} // Use category name or another descriptor for alt text
                                    style={imageStyle}
                                />
                                <a className="cat-overlay text-white text-decoration-none" href="#">
                                    <h4 className="text-white font-weight-medium">{category.name}</h4>
                                    <span>{category.course_count} Courses</span> {/* Adjust based on actual category data */}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseCategories;
