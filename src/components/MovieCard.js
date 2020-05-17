import React, { Component } from 'react' 
import Loader from '../components/Loader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import _ from 'lodash';
import ReactPlayer from 'react-player';

class MovieCard extends Component {
    
    render () {
        //console.log('movies', this.props.movie)
        if(!this.props.movie){
            return <div><Loader/></div>
        }
        const {image, title, year, description, trailerUrl, 
            genre, duration, director, plot, details, showDate,
        stars, country} = this.props.movie
        return (
            <div className="ui container">
                <div className="ui centered stackable grid">
                    <div className="ui ten column row ">
                        <div className="ten wide column">
                        <ReactPlayer 
                        url={trailerUrl}  
                        controls
                        light
                        width='100%'
                        />
                        </div>
                        <div className="six wide column">
                            <button className="ui fluid button">{trailerUrl}</button>
                            <button className="ui fluid button">{trailerUrl}</button>
                            <button className="ui fluid button">{trailerUrl}</button>
                        </div>
                    </div>
                    <div className="ui row">
                    <div className="column">
                        <p>{plot}</p>
                    </div>
                    </div>
                    <div className="ui row">
                        <div className="column">
                            <h2 className="header">Details</h2>
                            <p>{details}</p>
                        </div>

                    </div>
                    <div className="ui two column row">
                        <div className="column">
                            <img src={image.imageUrl} alt={title} style={{height:'634px', width:'550px'}}/>
                        </div>
                        <div className="column" >
                            <div className="ui styled accordion" >
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Country
                                </div>
                                <div className="active content">
                                    <p>{country}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Year
                                </div>
                                <div className="active content">
                                    <p>{year}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Director
                                </div>
                                <div className="active content">
                                    <p>{director}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Stars
                                </div>
                                <div className="active content">
                                    <p>{stars}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        in Theater
                                </div>
                                <div className="active content">
                                    <p>{showDate}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Genre
                                </div>
                                <div className="active content">
                                    <p>{genre}</p>
                                </div>
                                <div className="active title">
                                    <i className="dropdown icon"></i>
                                        Duration
                                </div>
                                <div className="active content">
                                    <p>{duration}</p>
                                </div>
                                
                            
                        </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
};


const mapStateToProps = (state, ownProps) =>{
    // console.log('state:', state.firestore.ordered.cinema)
    // console.log('ownProps:', ownProps)
    const movies = _.mapKeys(state.firestore.ordered.cinema, 'movieName')
    // console.log('movies:', movies)
    return {
        movie:movies[ownProps.match.params.movieName]
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'cinema'}
    ])
)(MovieCard) 

