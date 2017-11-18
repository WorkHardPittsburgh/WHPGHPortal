import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import '../css/projects.css';
// import ProjectStatus from './ProjectStatus';

import { CurrentUser } from '../scripts/Globals.js';
import { fetchProjects } from '../actions';

class WHProjects extends Component {

  //Get uptakes by AssigneeId
  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    var myProjects = {}
    myProjects = _.filter(this.props.projects, project => { return project.OwnerId !== CurrentUser.id; })
    
    return _.map(myProjects, project => {
      return (
        <div className="wrap" key={project.id}>
          <div className="project-header">
              <div id="project-title">
                  <h3>{project.ProjectName}s</h3>
              </div>
              <div id="status">
                  <h3>{project.ProjectStatus}</h3>
              </div>
          </div>
          <div className="project-body">
              <p>
                  {project.ProjectDesc}
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
  return { projects: state.projects };
}

export default connect(mapStateToProps, { fetchProjects })(WHProjects);