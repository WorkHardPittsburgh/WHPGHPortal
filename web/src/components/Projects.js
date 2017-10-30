import React, { Component } from 'react';
import '../css/projects.css';
import '../css/App.css';
import MyProjects from './Projects_Mine';
import WHProjects from './Projects_WH';

class Projects extends Component {
    render() {
    return (
    <div className="wrap">
      <div className="projects">
        <div className="my-projects">
          <h2>My Projects</h2>
            <MyProjects />
        </div>
        <div className="wh-projects">
          <h2>WHPGH Projects</h2>
            <WHProjects />
        </div>
      </div>
    </div>
    );
  }
}

export default Projects;