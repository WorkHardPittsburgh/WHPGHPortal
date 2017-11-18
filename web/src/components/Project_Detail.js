import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { fetchProject, fetchClient, fetchMilestones } from '../actions';
import CreateMilestone from './Milestone_Create';
import '../css/projectdetail.css';
import '../css/milestones.css';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showModal: false,
            // openModal: false
            showMilestones: true
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchProject(id)
            .then(() => {
                const { project } = this.props;
                this.props.fetchClient(project.ClientId);
            })
            .then(() => {
                this.props.fetchMilestones()
            });
    }

    // close() {
    //     this.setState({ showModal: false });
    // }

    // open() {
    //     this.setState({ 
    //         showModal: true,
    //         openModal:true
    //      });
    // }

    getClientName(id) {
        const { client } = this.props;

        var currentClient = _.find(client, ['id', id])
        if (!currentClient) {
            return "Getting client"
        }

        return currentClient.Name

    }

    // onDeleteClick(id) {
    //     this.props.deleteMilestone(id, () => {
    //         this.props.history.push('/projects')
    //     });
    // }

    renderMilestones() {
        const { project, milestones } = this.props;
        
        var projMilestones = {}
        projMilestones = _.filter(milestones, milestone => { return milestone.UptakeId === project.id })
        
        return _.map(projMilestones, milestone => {
            const location = {
                pathname: `/milestones/${milestone.id}`, 
                state: { 
                    projectID: `${project.id}`,
                    projectName: `${project.ProjectName}`,
                    milestoneName: `${milestone.Name}`,
                    milestoneID: `${milestone.id}` 
                }
            };

            return (
                <div className="wrap" key={milestone.id}>
                    <Link to={location} className="m-header">
                        <div className="m-header m-title">
                            {milestone.Name}
                        </div>
                    </Link>
                    <div className="project-body">
                        {milestone.Description}
                        <Grid className="detail">
                            <Row className="m-info">
                                <Col md={1}>Hours: <span>{milestone.Hours}</span></Col>
                                <Col md={1}>Rate: <span>{milestone.Rate}</span></Col>
                                <Col md={2}>Total Cost: <span>{(milestone.Hours * milestone.Rate)}</span></Col>
                                <Col md={3}>Start Date: <span>{milestone.StartDate}</span></Col>
                                <Col md={3}>Complete Date: <span>{milestone.CompleteDate}</span></Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
                
            );
        });
    }

    updateMilestones() {
        this.setState({
            showMilestones: !this.showMilestones
        });
    }

    render() {
        const { project, client, milestones } = this.props;

        if (!project || !client || !milestones) {
            return <div>Loading...</div>
        }

        return (
            <div className="wrap">
                <Link to="/projects">Back</Link>
                <div className="p-body">
                    <h1 className="project-name">{project.ProjectName}</h1>
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col md={2}>Status: <p className="value">{project.ProjectStatus}</p></Col>
                            <Col md={3}>Service Type: <p className="value">{project.ServiceType}</p></Col>
                            <Col md={3}>Client: <p className="value">{this.getClientName(project.ClientId)}</p></Col>
                        </Row>
                    </Grid>
                    <h3 className="normal">
                        Description: <p className="value">{project.ProjectDesc}</p>
                    </h3>
                    <CreateMilestone uptakeID={project.id} showM={this.updateMilestones.bind(this)} />
                    <div>
                        {this.renderMilestones()}
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps({ projects, clients, milestones }, ownProps) {
    return { 
        project: projects[ownProps.match.params.id],
        client: clients,
        milestones: milestones,
     };
}

export default connect(mapStateToProps, { fetchProject, fetchClient, fetchMilestones })(ProjectDetail);