import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

class Header extends React.Component{

    render(){
    //console.log('props:',this.props)
    // const {response, isSignedIn, movie} = this.props
    // console.log('newMovies', movie)

    // if(isSignedIn) {
        
    //     const currentUserProfile = response.currentUser.get().getBasicProfile()
    //     let userId, userEmail, userName, imageUrl;
    //     const userProfileOne= [
    //         userId=currentUserProfile.getId(),
    //         userName=currentUserProfile.getName(),
    //         userEmail=currentUserProfile.getEmail(),
    //         imageUrl=currentUserProfile.getImageUrl(),    
    // ]    
    //     // console.log('userProfileOne', userProfileOne)
    //     // console.log(typeof(userProfileOne))
    //     const userProfileTwo = new Array ({
    //         userId:currentUserProfile.getId(),
    //         userName:currentUserProfile.getName(),
    //         userEmail:currentUserProfile.getEmail(),
    //         imageUrl:currentUserProfile.getImageUrl(),    
    //     })
    //     console.log('userProfileTwo', userProfileTwo)
    //     // console.log(typeof(userProfileTwo))

    //     const newMovie = {...movie, 
    //         create:userProfileTwo,
    //     }
    //     console.log(_.omit(newMovie, 'director', 'create'))
        
    //     console.log('cancatted', newMovie)
    // }


    
    return (
            <div>
                <div className="ui inverted segment">
                    <div className="ui inverted secondary pointing menu">
                        <NavLink to={"/"} exact  className="item">
                            Home
                        </NavLink>
                        <NavLink to={"/movies/new"}  exact className="item">
                            Add Movie
                        </NavLink>
                        <NavLink to={"/movies/search"}  exact className="item">
                            Search Movie
                        </NavLink>
                        <div className="right menu">
                        <GoogleAuth />
                        </div>
                    </div>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    const movies = _.mapKeys(state.firestore.ordered.cinema, 'id')
    return{
        isSignedIn:state.googleAuth.isSignedIn,
        response:state.googleAuth.response,
        movieImage:state.movieImage,
        movie:movies["txg59PVPsv4HYqdMeW58"],
    }
}
export default connect(mapStateToProps)(Header);
