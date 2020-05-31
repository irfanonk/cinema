import React from 'react'
import {signIn, signOut}  from '../../store/actions/authActions';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('auth2',() =>{
            window.gapi.auth2.init({
                client_id:'5830305526-k708ani7rblhosfbq9ddiudjtjp81j58.apps.googleusercontent.com',
                scope:'email',
    
            }).then((response)=>{
                // console.log('response', response)
                // console.log('currenUser', response.currentUser.get())
                this.response = response
                //console.log('this.response', this.response)
                this.isSignedIn = this.response.isSignedIn.get()
                this.onChange(this.isSignedIn)
                this.response.isSignedIn.listen(this.onChange)
                
            })
        })
    }
   
    onChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.response)
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.response.signIn()
    }

    onSignOutClick = () => {
        this.response.signOut()
    }

    renderAuthButton() {
        //console.log(this.props)
        if (this.props.isSignedIn){
            return (
            <button 
            className="ui red button" data-tooltip="Sign Out" data-position="bottom center"
            onClick={this.onSignOutClick} >
                <i className="google icon" />Out
            </button>    
            )
        }else {
            return (
            <button 
            className="ui red button" data-tooltip="Sign In" data-position="bottom center"
            onClick={this.onSignInClick} >
                <i className="google icon" />In
            </button> 
            )
        }
    }

    render() {        
        return (
            <React.Fragment>{this.renderAuthButton()}</React.Fragment>
        )
    }
    }


    const mapStateToProps = (state) => {
        //console.log('state', state)
        return{
            isSignedIn:state.auth.isSignedIn,
        }
}
    

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)
