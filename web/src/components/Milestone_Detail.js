import React, { Component } from 'react';
import {Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup, FormControl } from 'react-bootstrap';

import { fetchTasks, fetchMilestone, deleteMilestone, fetchProject, fetchClients, updateTaskStatus } from '../actions';

class MilestoneDetail extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchMilestone(id)
            .then(() => {
                this.props.fetchTasks()
            });
        this.props.fetchClients();
    }

    onDeleteClick() {
        const { projectID, milestoneID } = this.props.location.state;

        this.props.deleteMilestone(milestoneID, () => {
            this.props.history.push(`/projects/${projectID}`)
        })
    }

    getAsigneeName(id) {
        const { client } = this.props;

        var asignee = _.find(client, ['id', id]);
        if (!asignee) {
            return "Getting asignee"
        }
        return asignee.Name
    }

    componentWillReceiveProps (nextProps) {
        const { change, tasks } = this.props;
        const values = nextProps.tasks;

        change('TaskStatus', values.TaskStatus);
    }
    

    renderSelectField(field) {
        // const { tasks } = this.props;
        // change('TaskStatus', tasks.TaskStatus);
        return (
            <FormGroup>
                <FormControl componentClass="select">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </FormControl>
            </FormGroup>
        );
    }

    onSubmit(values) {
        const { tasks } = this.props;
        console.log(values);
        console.log(tasks);
    }

    renderTasks(taskProgress) {
        const { tasks, milestone, handleSubmit } = this.props;

        var mTasks = {};
        mTasks = _.filter(tasks, task => { return (task.MilestoneId === milestone.id && task.TaskStatus === taskProgress) })

        return _.map(mTasks, task => {
            return (
                <div key={task.id} className="wrap">
                    <div className="m-task-header">
                        {task.Name} 
                        <form onChange={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                name="TaskStatus"
                                component={this.renderSelectField}
                            />
                        </form>
                        
                    </div>
                    
                    <div className="project-body">
                        <p>{task.Description}</p>
                        
                        <div className="t-detail">
                            <p className="task-value">Start Date: <span className="white">{milestone.StartDate}</span></p>
                            <p className="task-value">Complete Date: <span className="white">{milestone.CompleteDate}</span></p>
                            <p className="task-value">Assignee: <span className="white">{this.getAsigneeName(task.AssigneeId)}</span></p>
                        </div>
                    </div>
                    <div>{taskProgress}</div>
                </div>
            );
        });
    }

    renderToDo() {
        const taskProgress = "To Do";
        return (
            <div>{this.renderTasks(taskProgress)}</div>
        );
    }

    renderInProgress() {
        const taskProgress = "In Progress";
        return (
            <div>{this.renderTasks(taskProgress)}</div>
        );
    }

    renderCompleted() {
        const taskProgress = "Completed";
        return (
            <div>{this.renderTasks(taskProgress)}</div>
        );
    }

    render() {
        const { milestone } = this.props;
        const { projectID, projectName, milestoneName } = this.props.location.state;
        // console.log(`projectID: ${projectID}  projectName: ${projectName}  milestoneName: ${milestoneName}`);
        
        if (!milestone) {
            return (
                <div>
                    <Link to={`/projects/${projectID}`}>Back</Link>
                    <div>Loading...</div>
                </div>
            );
        }

        return (
            <div className="wrap">
                <div>
                    <Link to={`/projects/${projectID}`}>Back</Link>
                    <button 
                        className="delete-button delete-milestone"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                        Delete
                    </button>
                </div>
                <div className="m-detail">
                    <h1>{projectName}</h1>
                    <div>
                        <h3 className="normal">
                            Milestone: <p className="value">{milestoneName}</p>
                        </h3>
                    </div>
                    <div>
                        <h3 className="normal">
                            Tasks and Status
                        </h3>
                        <Grid>
                            <Row>
                                <Col md={4}>
                                    <div className="m-detail-title">
                                        <h3>To Do</h3>
                                    </div>    
                                    {this.renderToDo()}
                                </Col>
                                <Col md={4}>
                                    <div className="m-detail-title">
                                        <h3>In Progress</h3>
                                    </div> 
                                    {this.renderInProgress()}
                                </Col>
                                <Col md={4}>
                                    <div className="m-detail-title">
                                        <h3>Completed</h3>
                                    </div> 
                                    {this.renderCompleted()}
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ tasks, milestones, clients }, ownProps) {
    return {
        milestone: milestones[ownProps.match.params.id],
        tasks: tasks,
        client: clients,
    };
}

const selector = formValueSelector('TasksStatusForm')

export default reduxForm({
    form: 'TasksStatusForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, { 
        fetchMilestone, 
        deleteMilestone, 
        fetchTasks, 
        fetchProject, 
        fetchClients, 
        updateTaskStatus 
    })(MilestoneDetail)
);