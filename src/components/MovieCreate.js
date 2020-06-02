import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createMovie, fetchMovies, clearCreateValues } from '../store/actions/moviesActions';
import {  } from '../store/actions/authActions';
import {reset} from 'redux-form';
import MovieForm from './MovieForm';
import GoogleAuth from './auth/GoogleAuth';
import Modal from './Modal';


class MovieCreate extends Component {
    
    state = {
        isModalOpen:'',
        fbPageY:0 // movie form create button pageY
    }

    // componentDidMount () {
        
    // }

    componentDidUpdate(pP, pS, sS) {
        // this.checkCreateStatus()
        // console.log('pP', pP)
        // console.log(this.props.createRes.movie.id)
        if (pP.createRes.movie.id !== this.props.createRes.movie.id) {
                this.setState({isModalOpen:true})
            }
    }

    renderCreateNew = () => {
        this.setState({isModalOpen:''});
        this.props.clearCreateValues();
        this.props.reset('movieForm');
    }
    
    renderCreateAction(){
        return (
        <React.Fragment>
            <Link to={'/'}  className="ui active button">Return Home</Link>
            <Link to={'/movies/new'} onClick={this.renderCreateNew} className="ui active button">Create New</Link>
        </React.Fragment>)
    }
    checkCreateStatus () {
        const {isModalOpen} = this.state
        //console.log('isModalOpen', isModalOpen)
        if (isModalOpen) {
            console.log('true')
            return (
                    <Modal
                        content={<h1  >Successfully Created</h1>}
                        actions={this.renderCreateAction()}
                        fbPageY={this.state.fbPageY}
                    />
            )
        } if (isModalOpen && this.props.createRes.error) {
            //console.log('false')
            return (
                <Modal
                    content={<h1>There's been an error. Try again!</h1>}
                    actions={<Link to={'/movies/new'} className="ui active button">Return Home</Link>}
                    fbPageY={this.state.fbPageY}
                />)
        }return(
            null
        )
    }

    renderUserProfile(){
        const { auth, emailAuth } = this.props
        let userPofile ={};
        if(auth.isSignedIn){
            const currentUserProfile = auth.signRes.currentUser.get().getBasicProfile();
            userPofile = {
                userId:currentUserProfile.getId(),
                userName:currentUserProfile.getName(),
                userEmail:currentUserProfile.getEmail(),
                imageUrl:currentUserProfile.getImageUrl(),    
            }
        }else if(!emailAuth.auth.isEmpty){
            userPofile = {
                userId:emailAuth.profile.userId,
                userName:emailAuth.profile.userName,
                userEmail:emailAuth.profile.userEmail,
                imageUrl:emailAuth.profile.userPhotoUrl,    
            }
        }return userPofile
    }

    onSubmit = (formValues) => {
        
        //console.log('onSubmit this', this)
        const createdBy = this.renderUserProfile()
        console.log('createdBy', createdBy)
        const { uploadedImgUrl,imageMetadata,auth } = this.props.image
        const image = {
            imageUrl:uploadedImgUrl,
            imageName:imageMetadata.name,
            imageSize:imageMetadata.size,
            imageType:imageMetadata.contentType,
        }

        this.props.createMovie({...formValues, image, createdBy },);
        //console.log('formValues', formValues)
    }

    checkSignStatus() {
        const { auth, emailAuth } = this.props
        if (auth.isSignedIn || !emailAuth.auth.isEmpty) {
            return (
                <React.Fragment>
                    <div className="ui orange center aligned segment">
                        <h1 className="header">Add a New Movie </h1>
                    </div>
                    <MovieForm 
                    onSubmit={this.onSubmit} 
                    submitButtonName="Create a Movie"
                    pageY={(y) => this.setState({fbPageY:y})}
                    />
                </React.Fragment>
            )
        } else if (!auth.isSignedIn && emailAuth.auth.isEmpty) {
            return (
                <div  style={{ textAlign: 'center', height:"70vh"}}>
                    <div className="ui icon message" style={{ margin: "auto" }} >
                        <i className="film icon"></i>
                        <div className="content">
                            <div className="header">
                            </div>
                            <h1>Please sign/log in to add movies</h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: 'center', height:"70vh"}}>
                    <div className="ui active dimmer">
                        <div className="ui middle text loader">
                            <div className="item">
                                <i className="google red large icon" />
                            </div>
                            <h1 className="header">Chenking for sing-in status</h1>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    
    onDenemeClick = (e, el, ref) => {
        
        console.log('onDenemeClick', e)
        // console.log('onDenemeClick ref', this.container)
        // console.log('onDenemeClick el' , el)

        console.log('clientX', e.clientX)
        console.log('nativeEvent', e.nativeEvent)
        console.log('current', window.innerHeight)
        console.log('current', window.innerWidth)
        // console.log('onDenemeClick', e.screenY)

    }

    render() {
        //console.log('MovieCreate props', this.props)
        //console.log('MovieCreate props', this.state)
        return (
            
            <div>
                <button onClick={this.onDenemeClick} >deneme 1</button>
                <button onClick={this.onDenemeClick} >deneme 2</button>

                {this.checkCreateStatus()}
                {this.checkSignStatus()}

                <button onClick={this.onDenemeClick} >deneme</button>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    console.log('state:', state)
    // console.log('movie id:', state.movie.id)
    
    return ({
        auth: state.auth,
        emailAuth:state.firebase,
        createRes: state.movie,
        image:state.image,
        
    })
}




export default connect(mapStateToProps, { createMovie, clearCreateValues,reset })(MovieCreate);