import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems } from '../cartSlice';
import { fetchCourses } from '../coursesSlice';

const Cart = () => {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchCourses());
  }, [dispatch]);

  const getCourse = (course_id) => {
    return courses.find(course => course.id === course_id);
  };

  const handleAddToCart = (courseId, priceAtAddition) => {
    dispatch(addToCart({ courseId, priceAtAddition }));
  };
  console.log(items)
  return (
    <div>
      <h1>Cart</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <ul>
          {items.map((item) => {
            const course = getCourse(item.course);
            return (
              <li key={item.id}>
                {course ? course.title : 'Unknown Course'} - {item.price_at_addition}
              </li>
            );
          })}
        </ul>
      )}
      
    </div>
  );
};

export default Cart;
