import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieForm from './MovieForm';
import GoogleAuth from '../components/GoogleAuth';
import Modal from './Modal';
import { createMovie, fetchMovies, deleteMovie } from '../store/actions/moviesActions';


class MovieCreate extends Component {
    
    state = {
        isModalOpen:'',
    }
    componentDidUpdate(pP, pS, sS) {
        // this.checkCreateStatus()
        console.log('pP', pP)
        console.log(this.props.createRes.movie.id)
        if (pP.createRes.movie.id !== this.props.createRes.movie.id) {
                this.setState({isModalOpen:true})
            }
    }
    renderCreateAction(){
        return (<React.Fragment>
            <Link to={'/'} onClick={() => this.setState({isModalOpen:''})} className="ui active button">Return Home</Link>
            <Link to={'/movies/new'} onClick={() => this.setState({isModalOpen:''})} className="ui active button">Create New</Link>
        </React.Fragment>)
    }
    checkCreateStatus () {
        const {isModalOpen} = this.state
        console.log('isModalOpen', isModalOpen)
        if (isModalOpen === true) {
            console.log('true')
            return (
                <Modal
                    content={<h1 style={{textAlign:'center'}} >Successfully Created</h1>}
                    actions={this.renderCreateAction()}
                />
            )
        } if (isModalOpen === false) {
            console.log('false')
            return (
                <Modal
                    content={<h1 style={{textAlign:'center'}}>There's been an error. Try again!</h1>}
                    actions={<Link to={'/movies/new'} className="ui active button">Return Home</Link>}
                />)
        }
    }


    onSubmit = (formValues) => {
        const { history } = this.props
        console.log('onSubmit this', this)
        this.props.createMovie(formValues, history);
        //console.log('formValues', formValues)
        return(
            <Modal
                content={<h1>Creating...</h1>} />
        )
    }

    checkSignStatus() {
        const { isSignedIn } = this.props
        if (isSignedIn === true) {
            return (
                <MovieForm onSubmit={this.onSubmit} />
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

    render() {
        // if(this.props.movie !== undefined){
        //     const {movie} =this.props
        //     console.log('movie id', movie.id)
        // }
        //console.log('this state', isCreateOk)
        
        return (
            <div>
                {this.checkCreateStatus()}
                {this.checkSignStatus()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log('state:', state)
    console.log('movie id:', state.movie.id)
    
    return ({
        isSignedIn: state.googleAuth.isSignedIn,
        createRes: state.movie,
        
    })
}

export default connect(mapStateToProps, { createMovie, deleteMovie })(MovieCreate);