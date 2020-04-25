import React, { Component, useRef } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Modal from './Modal';

class MoviesList extends Component {


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
                        <Link to={'/'} className="ui labeled icon left floated primary button">
                            <i className="edit icon"></i>
                        Edit
                    </Link>
                    <Link to={`/movies/delete/${id}`} className="ui labeled icon right floated red button">
                            <i className="right trash icon"></i>
                        Delete
                    </Link>
                    </React.Fragment>
                )
            }
        }
        return (
            <button className="fluid ui button">Sign In to edit or delete</button>
        )
    }


    renderList(firestoreMovies) {
        //console.log('movies:', movies)
        return firestoreMovies.map(movie => {
            const { id, title, duration, year, createdBy, image } = movie
            return (
                <div className="column" key={id}>

                    <div className="ui fluid card">
                        <Link to={`/movies/${id}`}  >
                            <div className="image">
                                <img src={image} alt={title} style={{ width: '357px', height: '500px' }} />
                            </div>
                        </Link>
                        <div className="center aligned content">
                            <h3 className="header">{title}</h3>
                        </div>
                        <div className="center aligned content">
                            <span >{duration} |</span>
                            <span >{year}</span>
                        </div>
                        <div className="content">
                            {createdBy.userEmail}
                            <div className="right floated author">
                                <img className="ui avatar image" src={createdBy.imageUrl} alt='' />{movie.createdBy.userName}
                            </div>
                        </div>
                        <div className="content">
                            {this.renderAdmin(createdBy.userId, id)}
                        </div>
                    </div>
                </div>


            )
        })

    }

    renderModal() {
        console.log('modal props', this.props)
    
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
                    <Loader />
                    :

                    <div className="ui stackable three column grid">
                        {this.renderList(firestoreMovies)}
                    </div>
                }
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    console.log('state:', state)
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