import React, { Component, useRef } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Modal from './Modal';
import { storage } from '../apis/fbConfig';

class MoviesList extends Component {

    componentDidMount() {

    }


    renderAdmin(registeredUserId, id) {
        const { response, isSignedIn } = this.props
        // console.log('id', id)
        // console.log('this.props', this.props)
        if (isSignedIn) {
            const currentUserId = response.currentUser.get().getBasicProfile().getId()
            //console.log('currentUserId', currentUserId)
            if (currentUserId === registeredUserId) {
                return (
                    <React.Fragment>
                        <Link to={`/movies/edit/${id}`} className="circular ui icon purple button">
                            <i className="edit icon"></i>
                    </Link>
                    <Link to={`/movies/delete/${id}`} className="circular ui icon red button">
                            <i className="trash icon"></i>
                    </Link>
                    </React.Fragment>
                )
            }
        }
        return (
            <React.Fragment>
            <button className="circular ui icon button">
                <i className="edit icon"></i>
            </button>
            <button className="circular ui icon button">
                <i className="icon trash"></i>
          </button>
          </React.Fragment>
        )
    }


    renderList(firestoreMovies) {
        //console.log('movies:', movies)
        return firestoreMovies.map(movie => {
            const { id, title, duration, year, createdBy, image } = movie
            return (
                <div className="column" key={id}>
                    <div className="ui fluid card"  >
                        <Link to={`/movies/${id}`}  className="ui large image" style={{borderStyle:'outset', maxHeight:'80%'}}>
                                <img src={image.imageUrl} alt={title}   />
                        </Link>
                        <div className="center aligned content">
                            <span >{duration} |</span>
                            <span >{year}</span>
                        </div>
                        <div className="center aligned content">
                            <h3 className="meta"> Added by:</h3> 
                            <div >
                                <img className="ui avatar image" src={createdBy.imageUrl} alt='' />{movie.createdBy.userName}
                            </div>
                        </div>
                        <div className="center aligned content">
                            {this.renderAdmin(createdBy.userId, id)}
                        </div>
                    </div>
                </div>


            )
        })

    }

    render() {
        const { movies, firestoreMovies } = this.props
        // console.log('movies:', movies)
        //console.log('firestoreMovies:', firestoreMovies)
        //const newMovies= !firestoreMovies ? movies : movies.concat(firestoreMovies)
        //console.log('newMovies:', newMovies)
        return (
            <div>
                <h1>Movies on Show</h1>
                {!firestoreMovies ?
                    <div><Loader /></div>
                    :

                    <div className="ui stackable five column grid">
                        {this.renderList(firestoreMovies)}
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
        isSignedIn: state.googleAuth.isSignedIn,
        response: state.googleAuth.response,
    })
}

export default compose(
    connect(mapStateToProps, { }),
    firestoreConnect([
        { collection: 'cinema' }
    ])
)(MoviesList) 