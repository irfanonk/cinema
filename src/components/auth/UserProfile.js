import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

class UserProfile extends Component {

    renderUserProfile(){
        const { auth, emailAuth } = this.props
        let userPofile ={};
        if(auth.isSignedIn){
            const currentUserProfile = auth.signRes.currentUser.get().getBasicProfile();
            userPofile = {
                userId:currentUserProfile.getId(),
                userName:currentUserProfile.getName(),
                userEmail:currentUserProfile.getEmail(),
                imageUrl:currentUserProfile.getImageUrl(),    
            }
        }else if(!emailAuth.auth.isEmpty){
            userPofile = {
                userId:emailAuth.profile.userId,
                userName:emailAuth.profile.userName,
                userEmail:emailAuth.profile.userEmail,
                imageUrl:emailAuth.profile.userPhotoUrl,    
            }
        }return userPofile
    }
    render() {
        const userProfile = this.renderUserProfile()
        console.log('userProfile', userProfile)
        return (
            <div>
                    <div className="column">
                        <div className="item">
                            <div className="image">
                                <img src={userProfile.imageUrl}/>
                            </div>
                        </div>
                    </div>
                    <div className="ui horizontal divider"> User Informations</div>
                    <div className="column">
                        <div className="item">
                            <div className="content">
                                <div className="header"></div>
                                <div className="meta">
                                    <span>Name: </span>
                                    {userProfile.userName}
                                </div>
                                <div className="meta">
                                    <span>Email</span>
                                    {userProfile.userEmail}
                                </div>
                                <div className="meta">
                                    <span>Id</span>
                                    {userProfile.userId}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui horizontal divider"></div>
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('state:', state)
    // console.log('movie id:', state.movie.id)
    
    return ({
        auth: state.auth,
        emailAuth:state.firebase,
    })
}




export default connect(mapStateToProps, { logOut })(UserProfile);