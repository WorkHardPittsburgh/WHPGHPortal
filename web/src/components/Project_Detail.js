import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import Milestones from './Milestones';
import { fetchProject, fetchClient } from '../actions';
import '../css/projectdetail.css';

class ProjectDetail extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchProject(id)
            .then((data) => {
                this.props.fetchClient(data.payload.data.ClientId);
            });
    }

    getClientName() {
        const { client } = this.props;
        var currentClient
        return currentClient = _.map(client, 'Name');
    }

    render() {
        const { project, client } = this.props;

        if (!project || !client) {
            return <div>Loading...</div>
        }

        return (
            <div className="wrap">
                <Link to="/projects">Back</Link>
                <div className="project-name">{project.ProjectName}</div>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col md={2}>Status: <p className="value">{project.ProjectStatus}</p></Col>
                        <Col md={3}>Service Type: <p className="value">{project.ServiceType}</p></Col>
                        <Col md={3}>Client: <p className="value">{this.getClientName()}</p></Col>
                    </Row>
                </Grid>
                <div className="normal">
                    Description: <p className="value">{project.ProjectDesc}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ projects, clients }, ownProps) {
    return { 
        project: projects[ownProps.match.params.id],
        client: clients,
     };
}

export default connect(mapStateToProps, { fetchProject, fetchClient })(ProjectDetail);