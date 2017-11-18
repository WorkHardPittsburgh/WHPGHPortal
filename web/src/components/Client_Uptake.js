import React, {Component} from 'react';
import '../css/App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {CurrentUser} from '../scripts/Globals.js';
var defaults = require('../webpack.config.js')

class CreateUptake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: CurrentUser.id,
      UptakeStatus: '',
      ServiceType: '',
      ProjectName: '',
      ProjectDesc: '',
      ProjectStatus: '',
      ClientId: 0,
      ClientList: [],
      ClientId: 0
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleInputChange = this
      .handleInputChange
      .bind(this);
  }

  componentDidMount = () => {
    axios
      .get(defaults.externals.Config.serverUrl + '/Clients', {})
      .then((response) => {
        this.setState({ClientList: response.data});
      })
      .catch(function (error) {
        console.warn(error);
      });

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleChange(event) {
    this.setState({ServiceType: event.target.value});
  }

  //Create Uptake
  sendData() {
    axios
      .post(defaults.externals.Config.serverUrl + '/Uptakes', {
      ProjectName: this.state.ProjectName,
      ServiceType: this.state.ServiceType,
      ProjectDesc: this.state.ProjectDesc,
      UptakeStatus: this.state.UptakeStatus,
      OwnerId: this.state.UserId,
      ClientId: this.state.ClientId
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  render() {
    return (
      <div className="wrap">
        <form className="create-form">
          <h2 className="form-title">Create Uptake</h2>

          <label className="create-label">
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
          </select>

          <label className="create-label">
            Service Type
          </label>
          <select
            className="select"
            name="ServiceType"
            value={this.state.ServiceType}
            onChange={this.handleInputChange}>
            <option value=''>Select</option>
            <option value='Web Development'>Web Development</option>
            <option value='Multimedia'>Multimedia</option>
            <option value='SEO'>SEO</option>
          </select>

          <label className="create-label">
            Client Name
          </label>

          <select
            className="select"
            name="ClientId"
            value={this.state.ClientId}
            onChange={this.handleInputChange}>
            <option value=''>Select</option>
            {this
              .state
              .ClientList
              .map(client => <option value={client.id}>{client.Name}</option>)}</select>

          <label className="create-label">
            Project Description
          </label>
          <textarea
            className="input-desc"
            name="ProjectDesc"
            type="textarea"
            value={this.state.ProjectDesc}
            onChange={this.handleInputChange}/>

          <button className="cancel-button">
            <Link to='/uptake'>Cancel</Link>
          </button>

          <button
            className="save-button"
            onClick={() => {
            this.sendData()
          }}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default CreateUptake;
