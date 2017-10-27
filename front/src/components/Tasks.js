import React, { Component } from 'react';
import '../css/Tasks.css';
import Task from './Task';
import '../css/App.css';

class Tasks extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="task-list">
          <h2>My Tasks</h2>
          <Task/>
        </div>
      </div>
    );
  }
}

export default Tasks;