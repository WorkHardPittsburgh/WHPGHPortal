import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchClient, deleteClient, editClient } from '../actions';
import '../css/App.css';

// var defaults = require('../webpack.config.js')

class EditClient extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchClient(id);
    }

    componentWillReceiveProps(nextProps) {
        const { change } = this.props
        const values = nextProps.initialValues;
        if (values !== null) {
          change('Name', values.Name);
          change('Company', values.Company);
          change('Email', values.Email);
          change('Username', values.Username);
          change('Password', values.Password);
        }
      }

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

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteClient(id, () => {
            this.props.history.push('/clients');
        });
    }

    onSubmit(values) {
        const { id } = this.props.match.params;
        this.props.editClient(id, values, () => {
            this.props.history.push('/clients');
        });
    }

    render() {
        const { client } = this.props;
        const { handleSubmit } = this.props;

        if (!client) {
            return <div>Loading...</div>
        }

        return (
            <div className="wrap">
                <form className="create-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h2 className="form-title">Edit Client</h2>
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

                    <button className="delete-button"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete
                    </button>
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
        errors.Name = "Enter a name!";
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

function mapStateToProps({ clients }, ownProps) {
    return { 
        client: clients[ownProps.match.params.id], 
        initialValues: clients[ownProps.match.params.id]
        };
}

export default reduxForm({
    validate,
    form: 'EditClientForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, { fetchClient, deleteClient, editClient })(EditClient)
);