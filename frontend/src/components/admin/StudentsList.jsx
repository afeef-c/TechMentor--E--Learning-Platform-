import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import api from '../../api';
import {ACCESS_TOKEN} from '../../constants';
import {useDispatch,useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom';


function StudentsList() {
    //const dispatch = useDispatch()
    //const users = useSelector(state=> state.auth.users)
    const [users, setUsers] = useState([])
    const authTokens = useSelector(state => state.auth.authTokens);
    const access = localStorage.getItem(ACCESS_TOKEN)
    const studentUsers = users.filter(user => user.user_type === 'student');
    
    const fetchUsersList = async () => {
        if (authTokens) {

            try {
                const response = await api.get('/users/users_list/', {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
                });
                setUsers(response.data);

            } catch (error) {
                console.error('Failed to fetch users list:', error);
            }
        }
    };

    useEffect(() => {

        fetchUsersList()
        
    }, [access])

  return (
    <div className="main-content">
        
        
        <div className="row">
            <div className="col-md">
                <div className="card">
                <div className="card-header">
                    <h4>Studnts</h4>
                    <div className="card-header-action">
                    <a href="#" className="btn btn-danger">View More <i className="fas fa-chevron-right" /></a>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive table-invoice">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <th className="text-center">Student ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">email</th>
                            <th className="text-center">Action</th>
                        </tr>
                        {studentUsers.map(user=>(
                                <tr>
                                    <td className="text-center"><a href="#">{user.id}</a></td>
                                    <td className="font-weight-600 text-center">{user.username}</td>
                                    <td className="text-center"><div className="badge badge-warning">{user.is_active ? 'Active' : 'Inactive'}</div></td>
                                    <td className="text-center">{user.email}</td>
                                    <td className="text-center">
                                    <NavLink  to={`/admin_dashboard/editUser/${user.id}`} className="btn btn-primary">Detail</NavLink>
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

export default StudentsList

