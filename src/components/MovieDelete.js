import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { deleteMovie } from '../store/actions/moviesActions';
import Modal from './Modal';

class MovieDelete extends Component {


    renderContent = (movie) => {
        if (movie) {
            return (
                <React.Fragment>
                   <h2> Are you sure want to delete movie: <span>{movie.title}</span></h2> 
                </React.Fragment>
            )
        }
    }
    renderActions( movie, history) {
       console.log('delete movie props', movie)
        return (
            <React.Fragment>
                <Link to="/" className="ui secondary basic button">Cancel</Link>
                <button 
                className="ui negative basic button" 
                onClick={() => this.props.deleteMovie(movie, history)}
                >Delete
                </button>
            </React.Fragment>
        )
    }
    render() {
        //console.log('delete props', this.props)
        const { movie, history, } = this.props
        //console.log(movie)
        return (
            <div>
                <Modal
                    title="Delete Movie"
                    content={this.renderContent(movie)}
                    actions={this.renderActions( movie, history)}
                    onDismiss={() => history.push('/')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('state:', state)
    const movies = _.mapKeys(state.firestore.ordered.cinema, 'movieName')
    return ({
        movie: movies[ownProps.match.params.movieName],
        isDeleteOk:state.movie.isDeleteOk,
    })
}

export default compose(
    connect(mapStateToProps, {deleteMovie}),
    firestoreConnect([
        { collection: 'cinema' }
    ])
)(MovieDelete) 