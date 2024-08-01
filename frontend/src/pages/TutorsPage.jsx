import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import api from '../api';

function TutorsPage() {

    const [users, setUsers] = useState([])
    const authTokens = useSelector(state => state.auth.authTokens);

    const tutors = users.filter(user => user.user_type === 'tutor');
    
    const fetchUsersList = async () => {
        try {
            const response = await api.get('/users/users_list/', );
            console.log("List: ", response);
            setUsers(response.data);

        } catch (error) {
            console.error('Failed to fetch users list:', error);
        }
        }
  useEffect(() => {

        fetchUsersList()
        
    }, [])



  return (
    <>

      {/* Header Start */}
      <div className="container-fluid page-header" style={{marginBottom: 90}}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center" style={{minHeight: 300}}>
            <h3 className="display-4 text-white text-uppercase">Tutors</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase"><a className="text-white" href>Home</a></p>
              <i className="fa fa-angle-double-right pt-1 px-3" />
              <p className="m-0 text-uppercase">Tutors</p>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* Team Start */}
      
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase mb-3" style={{letterSpacing: 5}}>Tutors</h5>
            <h1>Meet Our Tutors</h1>
          </div>
          <div className="row">
          {tutors.map(tutor=>
            <div className="col-md-6 col-lg-3 text-center team mb-4">
              <div className="team-item rounded overflow-hidden mb-2">
                <div className="team-img position-relative">
                  <img className="img-fluid" src={tutor.profile_pic || "src/assets/img/team-2.jpg"} alt />
                  <div className="team-social">
                    <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-outline-light btn-square mx-1" href="#"><i className="fab fa-linkedin-in" /></a>
                  </div>
                </div>
                <div className="bg-secondary p-4">
                  <h5>{tutor.username} </h5>
                  <p className="m-0">{tutor.bio}</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Team End */}
    </> 

  )
}

export default TutorsPage
