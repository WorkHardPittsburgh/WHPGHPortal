import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchClients, deleteClient } from '../actions';

import '../css/clients.css';
import '../css/App.css';


class Clients extends Component {
  componentDidMount() {
    this.props.fetchClients();
  }

  renderClients() {
    return _.map(this.props.clients, client => {
      return (
        <div key={client.id}>
        <Link to={`/clients/${client.id}`}>
            <div className="client-name">
              <h5>{client.Name}</h5>
            </div>
            <div className="client-company">
              <h5>{client.Company}</h5>
            </div>
            <div className="client-email">
              <h5>{client.Email}</h5>
            </div>
            <div className="action-edit">
              <h5>Edit |</h5>
            </div>
            <div className="action-delete">
              <h5 onClick={this.onDeleteClick.bind(this)}>Delete |</h5>
            </div>
            <div className="action-pw">
              <h5>Reset Password</h5>
            </div>
          </Link>
        </div>
      );
    });
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deleteClient(id, () => {
        this.props.history.push('/clients');
    });
  }

  render() {
    return (
      <div className="wrap">
        <div className="client-container">
          <button className="create-button">
            <Link to ={`/clients/new`}>New Client</Link>
          </button>
          <h2>Clients</h2>
            <div className="client-header">
              <div className="name-head">
                <h4>Name</h4>
              </div>
              <div className="company-head">
                <h4>Company</h4>
              </div>
              <div className="email-head">
                <h4>Email</h4>
              </div>
            </div>
            <div className="client-body">
              <div>
                {this.renderClients()}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { clients: state.clients };
}

export default connect(mapStateToProps, { fetchClients, deleteClient })(Clients);