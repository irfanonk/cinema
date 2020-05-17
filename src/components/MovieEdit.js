import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { editMovie, clearCreateValues, deleteImage} from '../store/actions/moviesActions';
import _ from 'lodash'
import Modal from './Modal';
import Loader from './Loader'
import MovieForm from './MovieForm'

class MovieEdit extends Component {
    
    componentDidMount () {
        this.props.clearCreateValues()
    }



    onSubmit = (formValues) => {
        const { uploadedImgUrl, imageMetadata } = this.props.image
        const { movie, history } = this.props
        //console.log('onSubmit formValues', formValues)
        
        //to check if user upload a new image
        //to prevent deleting image from storage if user uploads exact the same image
        if(uploadedImgUrl && uploadedImgUrl !== movie.image.imageUrl){
            //console.log('uploadedImgUrl', uploadedImgUrl)
            const image = {
                imageUrl:uploadedImgUrl,
                imageName:imageMetadata.name,
                imageSize:imageMetadata.size,
                imageType:imageMetadata.type,
            }
            this.props.deleteImage(movie)
            this.props.editMovie({...formValues, image}, movie, history);
            //console.log('formValues', {...formValues, image})
            

        }else{
            this.props.editMovie(formValues, movie, history)
            //console.log('formValues', formValues)
        }

    }


    renderEdit() {
        if(!this.props.movie){
            return <Loader />
        }else 
        return (
            <React.Fragment>
                <div className="ui yellow center aligned segment">
                    <h1 className="header">{`Edit Movie: ${this.props.movie.title}`} </h1>
                </div>
                <MovieForm 
                onSubmit={this.onSubmit}
                initialValues={_.pickBy(this.props.movie)}
                initialImgSrc={this.props.movie.image.imageUrl}
                submitButtonName='Update this Movie'
                />
            </React.Fragment>
        )
    }
    render() {
        console.log('edit props', this.props.movie)
        return (
            <div>
                {/* {this.checkEditStatus()} */}
                {this.renderEdit()}
            </div>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    //console.log('state:', state)
    const movies = _.mapKeys(state.firestore.ordered.cinema, 'movieName')
    console.log('movies:', movies)
    console.log('ownProps:', ownProps)
    return ({
        movie: movies[ownProps.match.params.movieName],
        image:state.image,
    })
}

export default compose(
    connect(mapStateToProps, {editMovie, clearCreateValues, deleteImage}),
    firestoreConnect([
        { collection: 'cinema' }
    ])
)(MovieEdit) 
