import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createMovieImage } from '../store/actions/moviesActions';


 class MovieImageCreate extends Component {

    onChange = e => {
        //to prevent crashing if user cancels selecting an image
        if(e.target.files[0]) {
            this.props.createMovieImage(e.target.files[0])
        }
        console.log('imageCreate', e.target.files[0])
    }


    
    render() {
        const {label, imagePreviewUrl} = this.props
        const noImagePreview = "https://firebasestorage.googleapis.com/v0/b/cinemadb-9769b.appspot.com/o/images%2FNoImage_Available.png?alt=media&token=55c13d9f-0f7c-4b79-88d1-d9112b3c1ba0"
        //console.log(this.props)
        return (
            <div className="field">
                <label>{label}</label>
                <input 
                type="file" 
                accept='.jpg, .png, .jpeg' 
                onChange={this.onChange} 
                />
                <div className="content">
                    <h3>Image Preview</h3>
                    <img 
                    src={imagePreviewUrl ? imagePreviewUrl : noImagePreview} 
                    style={{maxWidth:"200px", maxHeight:"400px"}} 
                    />
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    //console.log('state', state)
    return {
        imagePreviewUrl:state.movieImage.image.imgPrevUrl
    }
}

export default connect(
    mapStateToProps, 
    {createMovieImage},
    )
    (MovieImageCreate);
