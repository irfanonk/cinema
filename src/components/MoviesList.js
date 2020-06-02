import React, { Component, useRef } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import Loader from './layout/Loader';
import Modal from './Modal';
import { storage } from '../apis/fbConfig';

class MoviesList extends Component {


    renderAdmin(registeredUserId, movieName) {
        const { signRes, isSignedIn, isLoggedIn } = this.props.auth
        const { uid, isEmpty } = this.props.emailAuth.auth
        
        // console.log('isEmpty', this.props.emailAuth)
        // console.log('movielist uid', uid)
        
        if (isSignedIn || !isEmpty) {

            const currentUserId = isSignedIn ?  
            signRes.currentUser.get().getBasicProfile().getId()
            : uid;
            
            //console.log('currentUserId', currentUserId)
            if (currentUserId === registeredUserId  ) {
                return (
                    <React.Fragment>
                        <Link to={`/movies/edit/${movieName}`} 
                        className="circular ui icon purple button" data-tooltip="edit" data-position="left center">
                            <i className="edit icon"></i>
                    </Link>
                    <Link to={`/movies/delete/${movieName}`} 
                    className="circular ui icon red button"  data-tooltip="delete" data-position="right center">
                            <i className="trash icon"></i>
                    </Link>
                    </React.Fragment>
                )
            }
        }
        return (
            <div data-tooltip="sign in" >
            <button className="circular ui icon button"  >
                <i className="edit icon"></i>
            </button>
            <button className="circular ui icon button">
                <i className="icon trash"></i>
          </button>
          </div>
        )
    }


    renderList(firestoreMovies) {
        //console.log('movies:', movies)
        return firestoreMovies.map(movie => {
            const { id, title, duration, year, createdBy, image ,genre, movieName } = movie
            return (
                <div className="column" key={id}>
                    <div className="ui fluid card"  >
                        <Link to={`/movies/${movieName}`}  className="ui large image" style={{borderStyle:'outset', maxHeight:'80%'}}>
                            <div className="floating ui blue label">
                                {year}
                            </div>
                                <img src={image.imageUrl} alt={title} />
                        </Link>
                        {title}
                        <div className="center aligned content">
                            <span >{duration} |</span>
                            <span >{genre}</span>
                        </div>
                        <div className="center aligned content">
                            <h3 className="meta"> Added by:</h3> 
                            <div className="ui image label">
                                <img  src={createdBy.imageUrl} alt='no image' />{movie.createdBy.userName}
                            </div>
                        </div>
                        <div className="center aligned content">
                            {this.renderAdmin(createdBy.userId, movieName)}
                        </div>
                    </div>
                </div>


            )
        })

    }

    render() {
        const { movies, firestoreMovies } = this.props
        //console.log('firestoreMovies:', firestoreMovies)
        //console.log('movielist :', this.props)
        return (
            <div>
                <div className="ui red center aligned segment">
                    <h1 className="header">All Movies </h1>
                </div>
                {!firestoreMovies ?
                    <div><Loader /></div>
                    :

                    <div className="ui grid">
                        <div className="doubling four column row">
                        {this.renderList(firestoreMovies)}
                    </div>
                    </div>
                }
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    //console.log('state:', state)
    return ({
        firestoreMovies: state.firestore.ordered.cinema,
        auth:state.auth,
        emailAuth:state.firebase,
    })
}

export default compose(
    connect(mapStateToProps, { }),
    firestoreConnect([
        { collection: 'cinema' },
        { collection: 'users' }
    ])
)(MoviesList) 
