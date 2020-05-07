import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createMovieImage, uploadMovieImage, deleteMovieImage, clearCreateValues } from '../store/actions/moviesActions';

 class MovieImageCreate extends Component {

    state = {
        creImgChng : false, //to see if selected image changes
    }

    componentDidUpdate(pP) {
        if(pP.movieImage.deleteImg !== this.props.movieImage.deleteImg) {
            setTimeout(() => {
                this.props.clearCreateValues()
            }, 2500);
        }else if(pP.movieImage.createdImage.imgPrevUrl !== this.props.movieImage.createdImage.imgPrevUrl) {
            this.setState({creImgChng :true})
        }

    }


    onChange =(e) =>{
        if(e.target.files[0]){
            this.props.createMovieImage(e.target.files[0])
        }
    }
    
    onUploadClick = () => {
        this.props.uploadMovieImage()
    }

    onDeleteClick = () => {
        this.props.deleteMovieImage(this.props.movieImage.imageMetadata.name)
    }

    render() {
        const {label, createdImage,  uploadImgPercent, uploadedImgUrl, uploadError, deleteImg, deleteImgError, imageMetadata} = this.props.movieImage
        const noImagePreview = "https://firebasestorage.googleapis.com/v0/b/cinemadb-9769b.appspot.com/o/images%2FNoImage_Available.png?alt=media&token=55c13d9f-0f7c-4b79-88d1-d9112b3c1ba0"
        const { creImgChng } = this.state
        //console.log('MovieImageCreate', this)
        const imageSrc 
            = this.props.initialImgSrc && !createdImage.imgPrevUrl ? this.props.initialImgSrc 
            : !this.props.initialImgSrc && createdImage.imgPrevUrl ? createdImage.imgPrevUrl 
            : noImagePreview
    
        
        return (

            <div style={{backgroundColor:'#d4d1dca6', margin:'30px 0 30px 0', alignContent:'center' }} >
                <div className="ui there column stackable center aligned grid">
                    <div className="sixteen wide column">
                            <input 
                            className="ui input"
                            type="file" 
                            accept='.jpg, .png, .jpeg' 
                            onChange={this.onChange} 
                            />
                    </div >
                    <div className="sixteen wide column row">
                        <div className="five wide column">
                            <h3>Selected Image Preview</h3>
                            <img 
                            className="ui medium image"
                            src={imageSrc} 
                            style={{maxWidth:"200px", maxHeight:"300px", margin:'auto'}} 
                            />
                        </div>
                        <div className="six wide column" style={{margin:'auto'}} >
                            <div className="ui teal progress" >
                                <div className="bar" style={{width: `${uploadImgPercent}%`}}>
                                    <div className="progress" >
                                        <span>{uploadImgPercent < 15 ? ""  : <span>{uploadImgPercent < 100 ? "uploading" : "completed" } </span> }</span>
                                        {uploadImgPercent}
                                        </div>
                                </div>
                            </div>
                            <button 
                            className={!uploadedImgUrl ? "ui orange button" : "ui green button"}
                            onClick={this.onUploadClick}
                            >
                                <span>{!uploadImgPercent ? <span><i className="upload icon"></i>Upload</span>  
                                : <span>{uploadImgPercent > 0 && !uploadedImgUrl ? <span><i className="spinner loading icon"></i>Uploading</span> 
                                : <span> <i className="crosshairs icon"></i>Comleted</span> } </span> }</span>    

                            </button>
                            <button 
                            className={!deleteImg ? "ui red button" : "ui orange button"}
                            onClick={this.onDeleteClick}
                            >
                               <span>{!deleteImg ? <span><i className="trash icon"></i>Remove</span> 
                                : <span><i className="spinner loading icon"></i>Removing</span>}</span>

                            </button>
                        </div>
                        <div className="five wide column">
                            <h3>Uploaded Image Preview</h3>
                            <img 
                            className="ui medium image"
                            src={uploadedImgUrl ? uploadedImgUrl : noImagePreview} 
                            style={{maxWidth:"200px", maxHeight:"300px", margin:'auto'}} 
                            />
                        </div>
                    </div>  
                    <div className="ten wide column">
                        
                    </div>
                </div>
                    
                </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    //console.log('state', state)
    return {
        movieImage:state.movieImage,
    }
}

export default connect(
    mapStateToProps, 
    {createMovieImage, uploadMovieImage, deleteMovieImage, clearCreateValues},
    )
    (MovieImageCreate);
