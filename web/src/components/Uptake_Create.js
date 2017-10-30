import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createUptake, fetchClients } from '../actions';
import '../css/App.css';

import { CurrentUser } from '../scripts/Globals.js';

class CreateUptake extends Component {
  componentDidMount() {
    this.props.fetchClients();
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

  renderClients() {
    return _.map(this.props.clients, client =>
      <option>
        {client.Name}
      </option>
    );
  }

  onSubmit(values) {
    this.props.createUptake(values, () => {
        this.props.history.push('/uptakes');
    });
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      // <div>MAKING AN UPTAKE</div>
      <div className="wrap">
        <form className="create-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2 className="form-title">Create Uptake</h2>
          <Field
            label="Project Name"
            name="ProjectName"
            type="text"
            component={this.renderField}
          />
          {/*<label className="create-label">
            Project Name
          </label>
          <input
            className="input"
            name="ProjectName"
            type="text"
            checked={this.state.ProjectDesc}
            onChange={this.handleInputChange}/>

          <label className="create-label">
            Status
          </label>
          <select
            className="select"
            name="UptakeStatus"
            value={this.state.UptakeStatus}
            onChange={this.handleInputChange}>
            <option value=''>Select</option>
            <option value='New'>New</option>
            <option value='Accepted'>Accepted</option>
            <option value='Declined'>Declined</option>
          </select>*/}
          <label>Service Type</label>
          <div>
            <Field
              label="Service Type"
              name="ServiceType"
              component="select">
              <option />
              <option value="Web Development">Web Development</option>
              <option value="Multimedia">Multimedia</option>
              <option value="SEO">SEO</option>
            </Field>
          </div>
        
          {/*Need to render clients to be able to select */}
          <label>Clients</label>
          <div>
            <Field
              label="Client"
              name="ClientId"
              component="select">
              <div>

              </div>
            {/*<option />
            <option>Josh</option>*/}
            </Field>
          </div>
          <Field 
            label="Project Description"
            name="ProjectDesc"
            type="textarea"
            component={this.renderField}>
            
          </Field>
          
          <button className="cancel-button">
            <Link to='/uptakes'>Cancel</Link>
          </button>

          <button
            className="save-button"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.ProjectName) {
      errors.ProjectName = "Enter a project name.";
  }
  if (!values.ServiceType) {
      errors.ServiceType = "Select a service type."
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

function mapStateToProps(state) {
  return { clients: state.clients };
}

export default reduxForm({
  validate,
  form: 'NewUptakeForm'
})(
  connect(mapStateToProps, { createUptake, fetchClients })(CreateUptake)
);

// export default connect(mapStateToProps, { fetchClients })(CreateUptake);