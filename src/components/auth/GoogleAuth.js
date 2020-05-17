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
                this.onAuthChange(this.isSignedIn)
                this.response.isSignedIn.listen(this.onAuthChange)
                
            })
        })
    }
   
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.response)
        } else {
            this.props.signOut(this.response)
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
            <div onClick={this.onSignOutClick} >
                <i className="google icon" />
                Sign Out
            </div>    
            )
        }else {
            return (
                <button onClick={this.onSignInClick} >
                <i className="google icon" />
                Sign In
            </button> 
            )
        }
    }

    render() {        
        return (
            <div>{this.renderAuthButton()}</div>
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
