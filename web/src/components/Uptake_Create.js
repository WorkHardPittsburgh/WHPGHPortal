import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createUptake, fetchClients } from '../actions';
import '../css/App.css';

// import { CurrentUser } from '../scripts/Globals.js';

class CreateUptake extends Component {
  // getting current clients to choose from for uptake
  componentDidMount() {
    this.props.fetchClients();
  }

  //renders the input for redux-form
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

  // submits the values to redux
  onSubmit(values) {
    this.props.createUptake(values, () => {
        this.props.history.push('/uptakes');
    });
    // console.log(values);
  }

  render() {
    const { handleSubmit } = this.props; //handleSubmit is a prop of redux-form

    return (
      <div className="wrap">
        <form className="create-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2 className="form-title">Create Uptake</h2>
          <Field
            label="Project Name"
            name="ProjectName"
            type="text"
            component={this.renderField}
          />
          <label>Service Type</label>
          <div>
            <Field
              label="Service Type"
              name="ServiceType"
              component="select"
              className="form-control">
              <option />
              <option value="Web Development">Web Development</option>
              <option value="Multimedia">Multimedia</option>
              <option value="SEO">SEO</option>
            </Field>
          </div>
          <div>
            <label>Clients</label>
            <Field
              label="Client"
              name="ClientId"
              type="number"
              component="select"
              className="form-control">
              {_.map(this.props.clients, client => {
                return (
                  <option key={client.Name} value={client.id}>
                    {client.Name}
                  </option>
                );
              })}
            </Field>
          </div>
          <div>
            <label>Project Description</label>
            <Field 
              label="Project Description"
              name="ProjectDesc"
              type="textarea"
              component="textarea"
              className="form-control">
            </Field>
          </div>
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
  // if (!values.ProjectDec) {
  //     errors.ProjectDesc = "Write out a project description."
  // }
      // If errors is empty, form is fine to submit
      // If errors has any properties, Rdeux Form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return { clients: state.clients };
}

export default reduxForm({
  validate,
  form: 'NewUptakeForm',
  initialValues: { 
    ProjectStatus: 'New',
    UptakeStatus: 'New',
    OwnerId: 1, 
  },
  enableReinitialize: true
})(
  connect(mapStateToProps, { createUptake, fetchClients })(CreateUptake)
);

// export default connect(mapStateToProps, { fetchClients })(CreateUptake);