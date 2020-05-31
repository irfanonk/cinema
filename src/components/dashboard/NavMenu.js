import React from 'react';
import {  Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';
import {NavLink} from 'react-router-dom';
import GoogleAuth from '../auth/GoogleAuth';
import UserProfile from '../auth/UserProfile';
import EmailLogin from '../auth/EmailLogin';
import CreateUser from '../auth/CreateUser';
import Loader from '../layout/Loader';

class NavMenu extends React.Component {

    state = {
        visible:'',
        logIn:false,
        createUser:false,
        userProfile:false,
        loading:true,
    }
    componentDidUpdate(pP){
        if(pP.emailAuth.auth.isEmpty !== this.props.emailAuth.auth.isEmpty){
            this.setState({visible:false})
        }
    }

    renderSidebar() {
        const { auth, emailAuth } = this.props
        if(this.state.logIn){
            return(
                <React.Fragment>
                    <EmailLogin/>
                </React.Fragment>
            )
        }else if(this.state.createUser){
            return(
                <React.Fragment>
                    <CreateUser/>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <UserProfile/>
                </React.Fragment>
            )
        }
    }

    renderLogInButtons(){
        const { auth, emailAuth } = this.props
        
        // if(auth.loading){
        //     return (
        //         <React.Fragment>
        //             <Loader/>
        //         </React.Fragment>
        //     )
        // }
        // else 
        if(auth.isSignedIn){
            return(
                <div>
                    <button 
                    className="ui green basic icon button"  data-tooltip="Profile"
                    onClick={() => this.setState({visible:'visible', logIn:false, createUser:false, userProfile:true})}>
                        <i className="user icon"></i>
                    </button>
                    <GoogleAuth/>
                </div>
            )
        }else if(!emailAuth.auth.isEmpty){
            return(
                <div>
                    <button 
                    className="ui green basic icon button" data-tooltip="Profile" position="bottom center"
                    onClick={() => this.setState({visible:'visible', logIn:false, createUser:false, userProfile:true})}>
                        <i className="user icon"></i>
                    </button>
                    <button className="ui red basic icon button" data-tooltip="Log Out" position="bottom center"
                    onClick={() => this.props.logOut()}>
                        <i className="sign out icon"></i>
                    </button>
                </div>
            )
        }else if(!auth.isSignedIn || emailAuth.auth.isEmpty){
            return(
                <div>
                    <GoogleAuth />
                    <button 
                    className="ui blue basic icon button" data-tooltip="Log In" data-position="bottom center"
                    onClick={() => this.setState({visible:'visible', logIn:true, createUser:false, userProfile:false})}>
                        <i className="sign in icon"></i>
                    </button>
                    <button 
                    className="ui blue basic icon button" data-tooltip="Add New User" data-position="bottom center"
                    onClick={() => this.setState({visible:'visible', logIn:false, createUser:true, userProfile:false})}>
                        <i className=" add user icon"></i>  
                    </button>
                </div>
            )
        }
    
    }


    render() {
        const { auth, emailAuth } = this.props
        return (
            <div className="ui center aligned segment" style={{background:'#923292' }}>
                <div className="ui stackable five item menu"  >
                    <h1 className="item" style={{marginRight:'25px'}} >CINEMA</h1>
                    <NavLink to={"/"} exact  className="link item">
                    <i className="home icon"></i> Home
                    </NavLink>
                    <NavLink to={"/movies/new"}  exact className="link item">
                        <i className="add icon"></i>Add Movie
                    </NavLink>
                    <NavLink to={"/movies/search"}  exact className="link item">
                        <i className="search icon"></i>Search Movie
                    </NavLink>
                    
                    <div className="ui right item" >
                        {this.renderLogInButtons()}
            </div>
            </div>
            
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => this.setState({visible:false})}
                vertical
                visible={this.state.visible}
                direction='right'
                width='wide'
                style={{background:'#923292'}}
            >
                <div onClick={() => this.setState({visible:false})} className="ui left item">
                    <i className="arrow right icon"></i>
                </div>
                <span>{this.renderSidebar()}</span>
            </Sidebar>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    //console.log(state)
    return{
        auth:state.auth,
        emailAuth:state.firebase,

    }
}
export default connect(mapStateToProps, { logOut })(NavMenu);