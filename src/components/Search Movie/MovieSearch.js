import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm} from 'redux-form';
import {fetchMovies} from '../../store/actions/searchAction';

class MovieSearch extends Component {

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
        this.props.fetchMovies(formValues);
        //console.log("new stream input:" , formValues)
        //console.log('props:',this.props)
    }
    render() {
        return (
            <div>
                <div className="ui purple center aligned segment">
                    <h1 className="header">Search a Movie</h1>
                </div>
                <form  
                    className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}   >
                    <Field name="text"  component={this.renderInput}  label="SearchMovie"/>
                    <button type="submit" onClick={this.onClick} className="ui button primary"><i className="paper plane icon"></i>Search</button>     
                    <button type="button" onClick={this.props.reset} className="ui green button"><i className="square outline icon"></i>Reset Fields</button>
                    </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('MovieSearch', state)
    return({
        
    })
}
export default compose(
    connect(mapStateToProps, { fetchMovies }),
    reduxForm({
        form: 'searchForm',
        // validate:validate,
    } )
)(MovieSearch) 