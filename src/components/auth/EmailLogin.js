import React, { Component } from 'react'
//Field is a component, reduxFrom is a function
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import {logIn, logOut, signIn}  from '../../store/actions/authActions';



class EmailLogin extends Component {

    componentDidUpdate(pP){
        const { auth, history } =this.props
        if(pP.auth.isSignedIn != this.props.auth.isSignedIn){
            console.log('signIn status Changed')
            //history.push('/')
        }
    }


    renderInput = ( { input, label, meta} ) => {
        //console.log("meta:", meta)
        //console.log("input:", input)
         const fieldclassName= `field ${meta.error && meta.touched ? 'error': ''}`
        return (
        <div className={fieldclassName}>
            <label >{label}</label>
            <input {...input} autoComplete="off"  />
            {meta.touched && meta.error && <span className="ui pointing label"> {meta.error}</span>}
            
        </div>        
        )
    }

    onSubmit = (formValues) => {
        const { history } = this.props
        const {email, password } = formValues
        this.props.logIn(email, password,history)
    }

    render() {
       console.log("form porps:", this.props)
       const { auth } =this.props
    //    console.log('emailAuth', this.props.emailAuth)
    //    console.log('auth', this.props.auth)
    //    console.log("warning:", this.props.warning)
       
        return (
            <div>
                <div className="ui red center aligned segment">
                    <h1 className="header">LOG IN </h1>
                </div>
            
                <div className="ui centered grid">
                    <div className="ten wide center aligned column" >
                        <form  
                        className="ui form error"
                        onSubmit={this.props.handleSubmit(this.onSubmit)}   >
                        <Field name="email"  component={this.renderInput}  label="Email"/>
                        <Field name="password" component={this.renderInput}  label="Password"/>
                        {this.renderLogin}
                        <button type="submit"  className="ui button primary"><i className="paper plane icon"></i>Submit</button>     
                        </form>
                    </div>
                </div>
                {auth.logRes.message ?
                    <div className="ui pointing label">
                        {auth.logRes.message}
                    </div>
                : null }
            </div>

            


        )
    }
}

const validate = (values) => {
    let errors ={};
    if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or long'
      }
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors

}



const mapStateToProps = (state) => {
    console.log('state:', state)
    return ({
        emailAuth:state.firebase.auth,
        auth:state.auth,


    })
}


export default compose(
    connect(mapStateToProps, { logIn }),
    reduxForm({
        form: 'emailLoginForm',
        validate:validate,
    } )
)(EmailLogin) 




