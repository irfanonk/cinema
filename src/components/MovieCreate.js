import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createMovie, fetchMovies, clearCreateValues } from '../store/actions/moviesActions';
import {reset} from 'redux-form';
import MovieForm from './MovieForm';
import GoogleAuth from '../components/GoogleAuth';
import Modal from './Modal';


class MovieCreate extends Component {
    
    state = {
        isModalOpen:'',
        fbPageY:0 // movie form create button pageY
    }

    // componentDidMount () {
    //     this.props.clearCreateValues()
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


    onSubmit = (formValues) => {
        const { history, uploadedImgUrl,imageMetadata } = this.props.movieImage
        console.log('onSubmit this', this)
        const image = {
            imageUrl:uploadedImgUrl,
            imageName:imageMetadata.name,
            imageSize:imageMetadata.size,
            imageType:imageMetadata.contentType,
        }

        this.props.createMovie({...formValues, image },);
        //console.log('formValues', formValues)
    }

    checkSignStatus() {
        const { isSignedIn } = this.props
        if (isSignedIn === true) {
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
        } else if (isSignedIn === false) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <div className="ui icon message" style={{ marginTop: "100px" }} >
                        <i className="film icon"></i>
                        <div className="content">
                            <div className="header">
                                <h3>Do you want to add your movie?</h3>
                            </div>
                            <h1>Please sign in to add movies</h1>
                        </div>
                    </div>
                    <div className="content"  >
                        < GoogleAuth />
                    </div>
                </div>
            )
        } else {
            return (
                <div >
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
        // console.log('MovieCreate props', this.state)
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
    //console.log('state:', state)
    // console.log('movie id:', state.movie.id)
    
    return ({
        isSignedIn: state.googleAuth.isSignedIn,
        createRes: state.movie,
        movieImage:state.movieImage,
        
    })
}




export default connect(mapStateToProps, { createMovie, clearCreateValues, reset })(MovieCreate);