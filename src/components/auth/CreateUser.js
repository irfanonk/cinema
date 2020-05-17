import React, { Component } from 'react';
import ImageCreate from '../ImageCreate';
//Field is a component, reduxFrom is a function
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import {createUser}  from '../../store/actions/authActions';



class CreateUser extends Component {
    
    componentDidUpdate(pP){
        const { auth, history } =this.props
        if(pP.auth.isSignedIn != this.props.auth.isSignedIn){
            console.log('signIn status Changed')
            history.push('/')
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
            {meta.touched && meta.error && <span> {meta.error}</span>}
            
        </div>        
        )
    }

    onSubmit = (formValues) => {
        const { history } = this.props
        this.props.createUser(formValues, history)
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
                    <h1 className="header">CREATE USER </h1>
                </div>
            
                <div className="ui centered grid">
                        <ImageCreate storageName='profilePhoto' />
                    <div className="ten wide center aligned column" >
                        <form  
                        className="ui form error"
                        onSubmit={this.props.handleSubmit(this.onSubmit)}   >
                        <Field name="email"  component={this.renderInput}  label="Email"/>
                        <Field name="password" component={this.renderInput}  label="Password"/>
                        <Field name="name" component={this.renderInput}  label="Name"/>
                        <Field name="lastname" component={this.renderInput}  label="Lastname"/>
                        {this.renderLogin}
                        <button type="submit"  className="ui button primary"><i className="paper plane icon"></i>Submit</button>     
                        </form>
                    </div>
                </div>
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
    connect(mapStateToProps, { createUser }),
    reduxForm({
        form: 'emailLoginForm',
        validate:validate,
    } )
)(CreateUser) 



