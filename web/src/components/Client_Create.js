import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createClient } from '../actions';
import '../css/App.css';

class CreateClient extends Component {
    renderField(field) {
        const { meta: { touched, error } }  = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createClient(values, () => {
            this.props.history.push('/clients');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="wrap">
                <form className="create-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h2 className="form-title">New Client</h2>
                    <Field 
                        label="Name"
                        name="Name"
                        type="text"
                        component={this.renderField}
                    />
                    <Field 
                        label="Company"
                        name="Company"
                        type="text"
                        component={this.renderField}
                    />
                    <Field 
                        label="Email"
                        name="Email"
                        type="text"
                        component={this.renderField}
                    />
                    <Field 
                        label="Username"
                        name="Username"
                        type="text"
                        component={this.renderField}
                    />
                    <Field 
                        label="Password"
                        name="Password"
                        type="password"
                        component={this.renderField}
                    />

                    

                    <button className="cancel-button">
                        <Link to='/clients'>Cancel</Link>
                    </button>
                    <button
                        className="save-button"
                        type="submit">Save</button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.Name) {
        errors.Name = "Enter a client name.";
    }
    if (!values.Company) {
        errors.Company = "Enter a company name."
    }
    if (!values.Email) {
        errors.Email = "Enter an email address."
    }
    if (!values.Username) {
        errors.Username = "Enter a username."
    }
    if (!values.Password) {
        errors.Password = "Enter a password."
    }
        // If errors is empty, form is fine to submit
        // If errors has any properties, Rdeux Form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'NewClientsForm'
})(
    connect(null, { createClient })(CreateClient)
);