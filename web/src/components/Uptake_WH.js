import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import '../css/projects.css';
// import ProjectStatus from './ProjectStatus';

import { CurrentUser } from '../scripts/Globals.js';
import { fetchUptakes } from '../actions';

class WHUptake extends Component {

  //Get uptakes by AssigneeId
  componentDidMount() {
    this.props.fetchUptakes();
  }

  renderProjects() {
    var myUptakes = {}
    myUptakes = _.filter(this.props.uptakes, uptake => { return uptake.OwnerId !== CurrentUser.id; })
    
    return _.map(myUptakes, uptake => {
      return (
        <div key={uptake.id}>
        <div className="project-header">
          <div id="project-title">
            <h3>{uptake.ProjectName}s</h3>
          </div>
          <div id="status">
            <h3>{uptake.ProjectStatus}</h3>
          </div>
        </div>
        <div className="project-body">
          <p>{uptake.ProjectDesc}
          </p>
        </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>{this.renderProjects()}</div>
    );
  }
}

function mapStateToProps(state) {
  return { uptakes: state.uptakes };
}

export default connect(mapStateToProps, { fetchUptakes })(WHUptake);