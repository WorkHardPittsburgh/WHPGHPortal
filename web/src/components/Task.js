import _ from 'lodash';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { CurrentUser } from '../scripts/Globals.js';
import { fetchTasks } from '../actions';
import '../css/Tasks.css';

class Task extends Component {
  //Get tasks by AssigneeId
  componentDidMount() {
      this.props.fetchTasks();
  }

  onSubmit(values) {
    // const { id } = 
    console.log(values);
  }

  renderTasks() {
    // const { handleSubmit } = this.props;
    var myTasks = {}
    myTasks = _.filter(this.props.tasks, task => { return task.AssigneeId === CurrentUser.id; })
    return _.map(myTasks, task => {
      return (
        <div key={task.id}>
          <div className="task-container">
            <div className="task-header">
              <h3 id="task-title">{task.Name}</h3>
              <h3 id="status">{task.TaskStatus}</h3>
              {/*<form onChange={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                  id="status"
                  name="TaskStatus"
                  component="select"
                > 
                  <option value="To Do">To Do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </Field>
              </form>*/}
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

export default reduxForm({
  form: 'TaskStatusForm',
})(
  connect(mapStateToProps, { fetchTasks})(Task)
);

// export default connect(mapStateToProps, { fetchTasks })(Task);