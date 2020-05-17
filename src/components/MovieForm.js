import React, { Component } from 'react'
//Field is a component, reduxFrom is a function
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux'
import ImageCreate from './ImageCreate';
import FieldFileInput from './FieldFileInput';

class MovieForm extends Component {
    
    state = {
        fbPageY:0 // movie form create button pageY
    }

    //since we use RenderInput in Field property 
    //we should use => funct. otherwise this.renderError gives undefined
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

    onSubmit = (formValues, e ) => {
        // handleSubmit itself calls event and event.preventDefault();
        //formValues takes user input that entered field directly
        this.props.onSubmit(formValues);
        //console.log("new stream input:" , formValues)
        //console.log('props:',this.props)
    }
    
    onClick = (e) => {
        this.props.pageY(e.pageY)
        //console.log('form nativeEvent', e.nativeEvent)
        console.log('pageY', e.pageY)
        // console.log('onButtonClick', e.screenY)
        
    }

    render() {
       //console.log("form porps:", this.props)
        return (
            <div className="ui centered grid">
                <ImageCreate storageName='images' label="Image" initialImgSrc={this.props.initialImgSrc}/>
                <div className="ten wide center aligned column" >
                    <form  
                    className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}   >
                    <Field name="title"  component={this.renderInput}  validate={validate} label="Title"/>
                    <Field name="details" component={this.renderInput} validate={validate} label="Details"/>
                    <Field name="plot" component={this.renderInput} label="Plot"/>
                    <Field name="duration" component={this.renderInput} label="Duration"/>
                    <Field name="year" component={this.renderInput} label="Year"/>
                    <Field name="country" component={this.renderInput} label="Country"/>
                    <Field name="stars" component={this.renderInput} label="Stars"/>
                    <Field name="genre" component={this.renderInput} label="Genre"/>
                    <Field name="director" component={this.renderInput} label="Director"/>
                    <Field name="trailerUrl" component={this.renderInput} label="TrailerUrl"/>
                    {/* <Field compnenent={FieldFileInput} label=''Image/> */}
                    <button type="submit" onClick={this.onClick} className="ui button primary"><i className="paper plane icon"></i>{this.props.submitButtonName}</button>     
                    <button type="button" onClick={this.props.reset} className="ui green button"><i className="square outline icon"></i>Reset Fields</button>
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
        isSignedIn:state.auth.isSignedIn,
    })
}


export default compose(
    connect(mapStateToProps, {  }),
    reduxForm({
        form: 'movieForm',
        // validate:validate,
    } )
)(MovieForm) 




