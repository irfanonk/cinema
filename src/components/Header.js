import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import GoogleAuth from './auth/GoogleAuth';
import EmailAuth from '../components/auth/EmailAuth';


class Header extends React.Component{

    renderLoginMenu(){
        const { auth, firebase } = this.props
        // return(
        //     <React.Fragment>
        //         <GoogleAuth />
        //         <EmailAuth />
        //     </React.Fragment>

        // )
        if(auth.isSignedIn){
            return(
                <React.Fragment>
                    <GoogleAuth />
                </React.Fragment>
            )
        }else if(!firebase.auth.isEmpty){
            return(
                <React.Fragment>
                        <EmailAuth />
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <GoogleAuth />
                    <EmailAuth />
                </React.Fragment>
            )
        }
        
        
    }

    render(){
        //console.log('header', this.props)
    return (
                <div className="ui green  segment" style={{margin:'20px 0px 20px 0px', textAlign:'center'}} >  
                    <div className="ui stackable tabular menu" >
                        <h1 style={{marginRight:'25px'}} >CINEMA</h1>
                        <NavLink to={"/"} exact  className="item">
                        <i className="home icon"></i> Home
                        </NavLink>
                        <NavLink to={"/movies/new"}  exact className="item">
                        <i className="add icon"></i>Add Movie
                        </NavLink>
                        <NavLink to={"/movies/search"}  exact className="item">
                        <i className="search icon"></i>Search Movie
                        </NavLink>
                        <div className="ui right dropdown item">
                            {this.renderLoginMenu()}
                            <GoogleAuth />
                            <EmailAuth />
                        </div>
                    </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return{
        auth:state.auth,
        firebase:state.firebase,

    }
}
export default connect(mapStateToProps)(Header);
