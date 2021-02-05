import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';



class StreamForm extends Component {
    // We are destructure our meta Object  to {touched, error} 
    // error is a message to show when when en error is accours 
    renderError({ touched, error }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        };
    };


    // Destruchred formProps to {input, label, meta}
    renderImput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ""}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );

    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }


    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderImput} label="Enter Title" />
                <Field name="description" component={this.renderImput} label="Enter Description" />
                <button className="ui button primary" >
                    Submit
                </button>
            </form>
        );
    };
};

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;

};

export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);
