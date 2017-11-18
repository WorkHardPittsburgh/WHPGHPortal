import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { createMilestone } from '../actions';

class CreateMilestone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            uptakeID: this.props.uptakeID,
        }
    }

    close() {
        this.setState({ 
            showModal: false,
        });
    }
    submitModal() {
        this.setState({
            showModal: false,
        })
        this.props.showM;
    }

    open() {
        this.setState({ showModal: true });
    }
    
    componentWillReceiveProps(nextProps) {
        const { change } = this.props;
        change('UptakeId', this.props.uptakeID);
    }

    renderField(field) {
        const { meta: { touched, error } }  = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderTextArea(field) {
        const { meta: { touched, error } }  = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea 
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // const { resetForm } = this.props;
        // console.log(values)
        // this.close();
        // console.log(this.props.uptakeID);
        return this.props.createMilestone(values, () => {
            // this.setState = this.state;
            this.props.showM
            this.submitModal();
            
            // this.props.history.push(`/projects/${this.props.uptakeID}`)
            // this.props.updateMilestones;
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h3>
                    Milestones
                </h3>
                <button 
                    className="m-button"
                    onClick={this.open.bind(this)}
                >
                    Add Milestone
                </button>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)} className="mod">
                    <Modal.Header closeButton className="mod-header">
                        <Modal.Title>Add a Milestone</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="create-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field 
                                label="Name"
                                name="Name"
                                type="text"
                                component={this.renderField}
                            />

                            <Field 
                                label="Description"
                                name="Description"
                                type="textarea"
                                multiline={true}
                                rows={5}
                                component={this.renderTextArea}
                            />

                            <Field 
                                label="Hours"
                                name="Hours"
                                type="number"
                                parse={value => Number(value)}
                                component={this.renderField}
                            />

                            <Field 
                                label="Rate"
                                name="Rate"
                                type="number"
                                parse={value => Number(value)}
                                component={this.renderField}
                            />

                            <Field
                                label="Start Date"
                                name="StartDate"
                                type="date"
                                component={this.renderField}
                            />

                            <Field
                                label="End Date"
                                name="CompleteDate"
                                type="date"
                                component={this.renderField}
                            />

                            <Field
                                name="uptakeId"
                                type="hidden"
                                component={this.renderField}
                            />

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="m-button" type="submit" onClick={handleSubmit(this.onSubmit.bind(this))}>Submit</Button>
                        {/*<Button className="m-button" type="submit">Submit</Button>*/}
                        <Button onClick={this.close.bind(this)} className="m-button">Cancel</Button>
                    </Modal.Footer>
                </Modal>
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
    if (!values.Hours) {
        errors.Description = "Enter the number of hours required for the milestone.";
    }
    if (!values.Rate) {
        errors.Description = "Enter the rate for the milestone.";
    }

    return errors;
}

export default reduxForm(
    {
    validate,
    form: 'NewMilestoneForm',
    initialValues: {
        PercentComplete: 0,
        MilestoneStatus: 'To Do',
    }
})(
    connect(null, { createMilestone })(CreateMilestone)
);