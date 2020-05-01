import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createMovieImage, uploadMovieImage } from '../store/actions/moviesActions';
import { storage } from '../apis/fbConfig';

 class MovieImageCreate extends Component {

    // state = {
    //     imagePreviewUrl :"https://firebasestorage.googleapis.com/v0/b/cinemadb-9769b.appspot.com/o/images%2FNoImage_Available.png?alt=media&token=55c13d9f-0f7c-4b79-88d1-d9112b3c1ba0",
    // }


    onChange =(e) =>{
        // const url= URL.createObjectURL(e.target.files[0])
        // this.setState({imagePreviewUrl:url})
        if(e.target.files[0]){
            this.props.createMovieImage(e.target.files[0])
        }
    }
    
    onClick = () => {
        this.props.uploadMovieImage()
    }


    render() {
        const {label, createdImage, uploadImgPercent, initialImgSrc} = this.props
        const noImagePreview = "https://firebasestorage.googleapis.com/v0/b/cinemadb-9769b.appspot.com/o/images%2FNoImage_Available.png?alt=media&token=55c13d9f-0f7c-4b79-88d1-d9112b3c1ba0"
        const imageSrc = initialImgSrc ? initialImgSrc : noImagePreview 
        //console.log(this.props)
        return (
            <div>
                
                <div className="ui placeholder segment" style={{textAlign:'center'}} >
                    <div className="ui stackable two clomun grid">
                        <div className="eight wide column">
                            <h3>Image Preview</h3>
                            <img 
                            // src={this.state.imagePreviewUrl}
                            src={createdImage.imgPrevUrl ? createdImage.imgPrevUrl : imageSrc} 
                            style={{maxWidth:"200px", maxHeight:"400px"}} 
                            />
                        </div>
                        <div className="eight wide column">
                            <div className="row">
                                <div className="ui input">
                                    <input 
                                    type="file" 
                                    accept='.jpg, .png, .jpeg' 
                                    onChange={this.onChange} 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <button className="ui grey button" onClick={this.onClick} >Upload</button>
                                <div className="ui teal progress" >
                                    <div className="bar" style={{width: `${uploadImgPercent}%`}}>
                                        <div className="progress" >
                                            <span>{uploadImgPercent < 20 ? ""  : <span>{uploadImgPercent < 100 ? "uploading" : "completed" } </span> }</span>
                                            {uploadImgPercent}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    //console.log('state', state)
    return {
        //imagePreviewUrl:state.movieImage.createdImage.imgPrevUrl,
        createdImage:state.movieImage.createdImage,
        uploadImgPercent:state.movieImage.uploadImgPercent,
    }
}

export default connect(
    mapStateToProps, 
    {createMovieImage, uploadMovieImage},
    )
    (MovieImageCreate);
