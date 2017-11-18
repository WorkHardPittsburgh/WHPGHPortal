import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createMilestone, fetchProject } from '../actions';

class CreateMilestone extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchProject(id);
    }

    render() {
        const { milestone, project } = this.props;
        return (
            <div className="wrap">
                {console.log(milestone.id)}
                <div>CREATING MILESTONES</div>
                <button>
                    <Link to=""></Link>
                </button>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.Name) {
        errors.Name = "Enter a name for the milestone.";
    }
    if (!values.Description) {
        errors.Description = "Enter a description for the milestone.";
    }

    return errors;
}

function mapStateToProps({ projects, milestones }, ownProps) {
    return { 
        milestone: milestones,
        project: projects[ownProps.match.params.id]
     };
}

export default reduxForm({
    validate,
    form: 'NewMilestoneForm',
})(
    connect(mapStateToProps, { createMilestone })(CreateMilestone)
);