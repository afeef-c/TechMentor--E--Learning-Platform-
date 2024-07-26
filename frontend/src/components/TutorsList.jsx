import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import api from '../api';
import {ACCESS_TOKEN} from '../constants';
import {useDispatch,useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom';


function TutorsList() {
    //const dispatch = useDispatch()
    //const users = useSelector(state=> state.auth.users)
    const [users, setUsers] = useState([])
    const authTokens = useSelector(state => state.auth.authTokens);

    const access = localStorage.getItem(ACCESS_TOKEN)
    const tutorsUsers = users.filter(user => user.user_type === 'tutor');
    
    const fetchUsersList = async () => {
        if (access) {
        try {
            const response = await api.get('/users/users_list/', {
            headers: {
                Authorization: `Bearer ${access}`
            }
            });
            console.log("List: ", response);
            setUsers(response.data);

        } catch (error) {
            console.error('Failed to fetch users list:', error);
        }
        }
    };

    //useEffect(() => {
    //    if (authTokens) {
    //    dispatch(fetchUserDetails());
    //    }
    //}, [authTokens, dispatch]);

    useEffect(() => {

        fetchUsersList()
        
    }, [access])

  return (
    <div className="main-content">
        
        
        <div className="row">
            <div className="col-md">
                <div className="card">
                <div className="card-header">
                    <h4>Tutors</h4>
                    <div className="card-header-action">
                    <a href="#" className="btn btn-danger">View More <i className="fas fa-chevron-right" /></a>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <th> ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                        {tutorsUsers.map(user=>(
                                <tr>
                                    <td><a href="#">{user.id}</a></td>
                                    <td className="font-weight-600">{user.username}</td>
                                    <td><div className="badge badge-warning">{user.date_joined}</div></td>
                                    <td>{user.email}</td>
                                    <td>
                                    <NavLink to={`/admin_dashboard/editUser/${user.id}`} className="btn btn-primary">Detail</NavLink>
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

export default TutorsList

