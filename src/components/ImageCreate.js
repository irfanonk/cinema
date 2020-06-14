import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createImage, uploadImage, deleteImage, clearCreateValues } from '../store/actions/moviesActions';

 class ImageCreate extends Component {

    state = {
        creImgChng : false, //to see if selected image changes
    }

    componentDidUpdate(pP) {
        if(pP.image.deleteImg !== this.props.image.deleteImg ) {
            setTimeout(() => {
                this.props.clearCreateValues()
            }, 2500);
        }else if(pP.image.createdImage.imgPrevUrl !== this.props.image.createdImage.imgPrevUrl) {
            this.setState({creImgChng :true})
        }

    }


    onChange =(e) =>{
        if(e.target.files[0]){
            this.props.createImage(e.target.files[0])
        }
    }
    
    onUploadClick = () => {
        const {image, storageName }= this.props;
        const imageName = image.createdImage.name

        this.props.uploadImage(storageName, imageName)
    }

    onDeleteClick = () => {
        this.props.deleteImage(this.props.image.imageMetadata.name)
    }

    render() {
        const {label, createdImage,  uploadImgPercent, uploadedImgUrl, uploadError, deleteImg, deleteImgError, imageMetadata} = this.props.image
        const noImagePreview = "https://firebasestorage.googleapis.com/v0/b/cinemadb-9769b.appspot.com/o/images%2FNoImage_Available.png?alt=media&token=55c13d9f-0f7c-4b79-88d1-d9112b3c1ba0"
        const { creImgChng } = this.state
        console.log('ImageCreate', this.props)
        const imageSrc 
            = this.props.initialImgSrc && !uploadedImgUrl ? this.props.initialImgSrc 
            : !this.props.initialImgSrc && uploadedImgUrl ? uploadedImgUrl 
            : noImagePreview
    
        
        return (

            <div style={{backgroundColor:'#d4d1dca6', margin:'30px 0 30px 0', alignContent:'center' }} >
                <div className="ui stackable center aligned grid" style={{margin:'auto'}}>
                    <div className="row">
                        <div className="eight wide column">
                            <input 
                            className="ui input"
                            type="file" 
                            accept='.jpg, .png, .jpeg' 
                            onChange={this.onChange} 
                            />
                        </div>
                            

                    </div >
                    <div className="row">
                        <div className="eight wide column" style={{margin:'auto'}} >
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
                        <div className="eight wide column">
                            <img 
                            className="ui medium image"
                            src={imageSrc} 
                            style={{maxWidth:"200px", maxHeight:"300px", margin:'auto'}} 
                            />
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
        image:state.image,
    }
}

export default connect(
    mapStateToProps, 
    {createImage, uploadImage, deleteImage, clearCreateValues},
    )
    (ImageCreate);
