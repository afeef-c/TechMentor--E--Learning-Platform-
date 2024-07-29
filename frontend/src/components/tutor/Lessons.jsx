import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../authSlice';
import api from '../../api';

function Lessons() {
  const dispatch = useDispatch();
  const { course_id } = useParams();
  const user = useSelector(state => state.auth.user);
  const authTokens = useSelector(state => state.auth.authTokens);
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isTutor = user && user.user_type === 'tutor';

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const lessonsResponse = await api.get(`courses/lessons/${course_id}/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setLessons(lessonsResponse.data);

        const coursesResponse = await api.get('courses/tutor_courses/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        const coursesData = coursesResponse.data.reduce((acc, course) => {
          acc[course.id] = course.title;
          return acc;
        }, {});
        setCourses(coursesData);
      } catch (error) {
        setError(error.response ? error.response.data : 'Error fetching lessons');
      } finally {
        setLoading(false);
      }
    };

    if (authTokens) {
      dispatch(fetchUserDetails());
      fetchLessons();
    }
  }, [authTokens, dispatch, course_id]);

  
  const renderFile = (fileUrl) => {
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={fileUrl} alt="Lesson File" style={{ maxWidth: '100%', height: 'auto' }} />;
    } else if (fileExtension === 'pdf') {
      return <a href={fileUrl} target="_blank" rel="noopener noreferrer"><i className="fas fa-file-pdf"></i> View PDF</a>;
    } else {
      return <p>Unsupported file format</p>;
    }
  };
  
  const renderVideo = (videoUrl) => {
    const youtubeMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      );
    } else {
      return <p>Invalid YouTube URL</p>;
    }
  };

  
  
  return (
    <div>
      <div className="section-body">
        <h2 className="section-title">Course: {courses[course_id]}</h2>
        <NavLink to={`/dashboard/add_lessons/${course_id}`} className="nav-item nav-link" >
            <i className="fas fa-edit"></i> Add Lessons
        </NavLink>
        {loading && <p>Loading lessons...</p>}
        {error && <p className="text-danger">{error}</p>}
        {lessons.length > 0 ? (
          <div className="row">
            {lessons.map((lesson, index) => (
              <div className="col-12 col-sm-6 col-lg-6 mb-3" key={lesson.id}>
                <div className="card">
                  <div className="card-header">
                    <h4>Lesson: {lesson.title}</h4>
                    <NavLink to={`/dashboard/update_lessons/${course_id}/${lesson.lesson_id}`} className="nav-item nav-link">
                        <i className="fas fa-edit"></i> Update
                    </NavLink>
                  </div>
                  <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id={`home-tab-${index}`}
                          data-toggle="tab"
                          href={`#home-${index}`}
                          role="tab"
                          aria-controls={`home-${index}`}
                          aria-selected="true"
                        >
                          Content
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={`profile-tab-${index}`}
                          data-toggle="tab"
                          href={`#profile-${index}`}
                          role="tab"
                          aria-controls={`profile-${index}`}
                          aria-selected="false"
                        >
                          Files
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id={`contact-tab-${index}`}
                          data-toggle="tab"
                          href={`#contact-${index}`}
                          role="tab"
                          aria-controls={`contact-${index}`}
                          aria-selected="false"
                        >
                          Video
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id={`home-${index}`}
                        role="tabpanel"
                        aria-labelledby={`home-tab-${index}`}
                      >
                        {lesson.content}
                      </div>
                      <div
                        className="tab-pane fade"
                        id={`profile-${index}`}
                        role="tabpanel"
                        aria-labelledby={`profile-tab-${index}`}
                      >
                        {renderFile(lesson.files)}
                      </div>
                      <div
                        className="tab-pane fade"
                        id={`contact-${index}`}
                        role="tabpanel"
                        aria-labelledby={`contact-tab-${index}`}
                      >
                        {renderVideo(lesson.video_url)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No lessons found for this course.</p>
        )}
      </div>
    </div>
  );
}

export default Lessons;
