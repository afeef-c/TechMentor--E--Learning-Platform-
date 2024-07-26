import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserDetails} from '../../authSlice'

function UserIntro() {
    const dispatch = useDispatch()
    const authTokens = useSelector((state)=> state.auth.authTokens)

    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens,dispatch])

    const user = useSelector((state)=>state.auth.user)


  return (
    <>

        <div className="row">
            <div className="col-12 col-md-12 ">
                <div className="card profile-widget">
                <div className="profile-widget-header">                     
                    <img
                        alt="User Profile"
                        src={user && user.profile_pic ? user.profile_pic : ('../../assets/img/avatar/avatar-1.png')}
                        className="rounded-circle profile-widget-picture"
                    />
                    <div className="profile-widget-items">
                    <div className="profile-widget-item">
                        <div className="profile-widget-item-label">Courses</div>
                        <div className="profile-widget-item-value">187</div>
                    </div>
                    <div className="profile-widget-item">
                        <div className="profile-widget-item-label">Students</div>
                        <div className="profile-widget-item-value">6,8K</div>
                    </div>
                    <div className="profile-widget-item">
                        <div className="profile-widget-item-label">Following</div>
                        <div className="profile-widget-item-value">2,1K</div>
                    </div>
                    </div>
                </div>
                <div className="profile-widget-description">
                    <div className="profile-widget-name">{user.username} <div className="text-muted d-inline font-weight-normal"><div className="slash" /> Web Developer</div></div>
                    {user.bio ? <p>{user.bio}</p> : <p>Add your bio</p>}
                </div>
                <div className="card-footer text-center">
                    <div className="font-weight-bold mb-2">{user.user_type==='tutor' ? <>Earn more by adding more courses</>  : <>Learn more from more tutors</>}</div>
        
                </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default UserIntro
