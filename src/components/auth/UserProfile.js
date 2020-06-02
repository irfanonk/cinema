import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import _ from 'lodash';

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
        const {firestoreMovies } = this.props
        //console.log('firestoreMovies', firestoreMovies)
        const userMovies = _.pickBy(firestoreMovies, '5MHdPhSZ7zqBmqJ96OQJ')
        //console.log('userMovies', userMovies)
        return (
            <div>
                <div>
                    <div className="item">
                        <div className="image">
                            <img src={userProfile.imageUrl}/>
                        </div>
                    </div>
                </div>
                <div className="ui horizontal divider"> 
                <i className="info icon"></i> User Informations
                </div>
                <div className="item">
                    <i className="large user icon"></i>
                    <div className="content">
                    <a className="header">Name</a>
                    <div className="description">{userProfile.userName}</div>
                    </div>
                </div>
                <div className="item">
                    <i className="large mail icon"></i>
                    <div className="content">
                    <a className="header">Email</a>
                    <div className="description">{userProfile.userEmail}</div>
                    </div>
                </div>
                <div className="item">
                    <i className="large tag icon"></i>
                    <div className="content">
                    <a className="header">ID</a>
                    <div className="description">{userProfile.userId}</div>
                    </div>
                </div>
                </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('user frofile state:', state)
    // console.log('movie id:', state.movie.id)
    const movies = _.filter(state.firestore.ordered.cinema, _.matches({'country':'b'}))
    const moviesOne =_.mapValues(state.firestore.ordered.cinema, function(o) { return o.title; });
    console.log('user movies', movies)
    //console.log('user moviesOne', moviesOne)
    return ({
        auth: state.auth,
        emailAuth:state.firebase,
        firestoreMovies:state.firestore.ordered.cinema,
    })
}




export default compose(
    connect(mapStateToProps, { }),
    firestoreConnect([
        { collection: 'cinema' },
        { collection: 'users' }
    ])
)(UserProfile) 