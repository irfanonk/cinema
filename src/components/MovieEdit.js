import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { editMovie } from '../store/actions/moviesActions';
import _ from 'lodash'
import Modal from './Modal';
import Loader from './Loader'
import MovieForm from './MovieForm'

class MovieEdit extends Component {
    state = {
        isModalOpen:'',
    }
    componentDidUpdate(pP, pS, sS) {
        // this.checkCreateStatus()
        console.log('pP', pP)
        console.log('editRes', this.props.editRes)
        //console.log(this.props.editRes.movie.id)
        // if (pP.editRes.movie.id !== this.props.editRes.movie.id) {
        //         this.setState({isModalOpen:true})
        //     }
    }
    renderEditAction(){
        return (<React.Fragment>
            <Link to={'/'} onClick={() => this.setState({isModalOpen:''})} className="ui active button">Return Home</Link>
            <Link to={'/movies/new'} onClick={() => this.setState({isModalOpen:''})} className="ui active button">Create New</Link>
        </React.Fragment>)
    }
    checkEditStatus () {
        const {isModalOpen} = this.state
        console.log('isModalOpen', isModalOpen)
        if (isModalOpen === true) {
            console.log('true')
            return (
                    <Modal
                        content={<h1  >Successfully Edited</h1>}
                        actions={this.renderEditAction()}
                        submitButton='Update'
                    />
            )
        } if (isModalOpen === false) {
            console.log('false')
            return (
                <Modal
                    content={<h1>There's been an error. Try again!</h1>}
                    actions={<Link to={'/movies/new'} className="ui active button">Return Home</Link>}
                />)
        }
    }


    onSubmit = (formValues) => {
        const { history, movie, uploadedImgUrl } = this.props
        console.log('onSubmit this', this)
        this.props.editMovie(formValues, history, movie);
        console.log('formValues', formValues)
    }


    renderEdit() {
        if(!this.props.movie){
            return <Loader />
        }else 
        return (
            <MovieForm 
            onSubmit={this.onSubmit}
            initialValues={_.pickBy(this.props.movie)}
            initialImgSrc={this.props.movie.image.imageUrl}
            />
        )
    }
    render() {
        console.log('edit props', this.props)
        return (
            <div>
                {/* {this.checkEditStatus()} */}
                {this.renderEdit()}
            </div>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    console.log('state:', state)
    const movies = _.mapKeys(state.firestore.ordered.cinema, 'id')
    return ({
        movie: movies[ownProps.match.params.id],
        editRes: state.movie,
        uploadedImgUrl:state.movieImage.uploadedImgUrl,
    })
}

export default compose(
    connect(mapStateToProps, {editMovie}),
    firestoreConnect([
        { collection: 'cinema' }
    ])
)(MovieEdit) 
