import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';

import { CurrentUser } from '../scripts/Globals.js';
import { fetchTasks } from '../actions';
import '../css/Tasks.css';

class Task extends Component {
  //Get tasks by AssigneeId
  componentDidMount() {
      this.props.fetchTasks();
  }

  renderTasks() {
    var myTasks = {}
    myTasks = _.filter(this.props.tasks, task => { return task.AssigneeId === CurrentUser.id; })
    console.log(CurrentUser.id);
    console.log(myTasks);
    return _.map(myTasks, task => {
      return (
        <div key={task.id}>
          <div className="task-container">
            <div className="task-header">
              <h3 id="task-title">{task.Name}</h3>
              <h3 id="status">{task.TaskStatus}</h3>
            </div>
            <p className="task-body">{task.Description}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderTasks()}
      </div>
     );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

export default connect(mapStateToProps, { fetchTasks })(Task);