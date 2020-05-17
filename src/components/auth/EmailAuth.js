import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {logIn, logOut}  from '../../store/actions/authActions';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import UserProfileSidebar from './UserProfileSidebar';


 class EmailAuth extends Component {    


    onProfileClick(){

    }

    renderUserLogin() {
        //console.log('renderLogin')
        const {emailAuth} = this.props
        if(emailAuth.auth.isEmpty){
            return (
                <React.Fragment>
                    <Link  to={'/EmailLogin'} className="ui button" >Log in</Link>
                    <Link  to={'/CreateUser'} className="ui button" >Create User</Link>
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                <button  onClick={this.props.logOut} >Log Out</button>
                <Link to={`/UserProfile/${emailAuth.profile.profileName}`} className="ui button">Profile</Link>
                <UserProfileSidebar />
                <button onClick={this.onProfileClick} > Try Profile</button>
            </React.Fragment>
        )
    }



    render() {
        return (
            <div>
                {this.renderUserLogin()}
                {/* <button onClick={this.renderLogin()} >Login</button> */}
            </div>
        )
    }   
}
const mapStateToProps = (state) => {
    return{
        emailAuth:state.firebase
    }
}

export default connect(mapStateToProps, {logIn, logOut})(EmailAuth)
