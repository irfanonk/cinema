import React, { Component } from 'react'
//Field is a component, reduxFrom is a function
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import MovieImageCreate from './MovieImageCreate';
import FieldFileInput from './FieldFileInput';
import { createMovieImage } from '../store/actions/moviesActions';

class MovieForm extends Component {
    
    //since we use RenderInput in Field property 
    //we should use => funct. otherwise this.renderError gives undefined
    renderInput = ( { input, label, meta} ) => {
        //console.log("meta:", meta)
        //console.log("input:", input)

         //whether or not to show error mess. we use a logic below
        //if there is meta.error and meta.touched then fieldclassName="field error"
        //otherwise fieldclassName=field
         const fieldclassName= `field ${meta.error && meta.touched ? 'error': ''}`
        return (
        <div className={fieldclassName}>
            <label >{label}</label>
            <input {...input} autoComplete="off" />
            {meta.touched && meta.error && <span> {meta.error}</span>}
        </div>
        
        )
    }

    onSubmit = (formValues) => {
        // handleSubmit itself calls event and event.preventDefault();
        //formValues takes user input that entered field directly
        this.props.onSubmit(formValues);
        //console.log("new stream input:" , formValues)
        //console.log('props:',this.props)
    }
    onChange = e => {
        //to prevent crashing if user cancels selecting an image
        if(e.target.files[0]) {
            this.props.createMovieImage(e.target.files[0])
        }
        console.log('imageCreate', e.target.files[0])
    }
    
    

    render() {
        //console.log("reduxForm methods:", this.props )
        return (
            <div className="ui centered grid">
                <div className="ten wide column" >
                    <h1 className="header" style={{textAlign:'center'}} > Add a Movie</h1>
                    <form  
                    className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}   >
                    <Field name="title" component={this.renderInput}  validate={validate} label="Title"/>
                    <Field name="details" component={this.renderInput} validate={validate} label="Details"/>
                    <Field name="plot" component={this.renderInput} label="Plot"/>
                    <Field name="duration" component={this.renderInput} label="Duration"/>
                    <Field name="year" component={this.renderInput} label="Year"/>
                    <Field name="stars" component={this.renderInput} label="Stars"/>
                    <Field name="genre" component={this.renderInput} label="Genre"/>
                    <Field name="country" component={this.renderInput} label="Country"/>
                    <Field name="director" component={this.renderInput} label="Director"/>
                    <Field name="trailerUrl" component={this.renderInput} label="TrailerUrl"/>
                    <MovieImageCreate label="Image" onChange={this.onChange} />
                    {/* <Field compnenent={FieldFileInput} label=''Image/> */}
                    <button className="fluid ui button primary"><i className="paper plane icon"></i>{this.props.submitButton}</button>     
                    </form>
                </div>
            </div>
        )
    }
}
//validate has the same name Field property has. (title and description)
//when error obj has identical name as Field has, then error message
//will pass down to this.renderInput in Field
// const validate = formValues => {
//     const errors= {};

//     if (!formValues.title) {
//         errors.title ="Enter a title"
//     }
//     if (!formValues.description) {
//         errors.description ="Enter a description"
//     }
//     return errors;
// }

const validate = v => {
    if(!v || v==='') {
        return `This field is required`
    }
    return undefined;
}

const mapStateToProps = (state) => {
    //console.log('state:', state)
    return ({
        isSignedIn:state.googleAuth.isSignedIn,
    })
}


export default compose(
    connect(mapStateToProps, { createMovieImage }),
    reduxForm({
        form: 'movieForm',
        // validate:validate,
    } )
)(MovieForm) 




