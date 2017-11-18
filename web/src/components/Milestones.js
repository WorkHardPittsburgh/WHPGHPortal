import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchMilestones } from '../actions';
import '../css/projects.css';

class Milestones extends Component {
    componentDidMount() {
        this.props.fetchMilestones();
    }
    renderMilestones() {
        const { milestones } = this.props;
        console.log(milestones);
        
        // var projMilestones = {}
        // projMilestones = _.filter(this.props.milestones, milestone => { return milestone.UptakeId === 1 })
        
        return _.map(milestones, milestone => {
            return (
                <div className="wrap" key={milestone.id}>
                    <div className="project-header">
                        {milestone.Name}
                    </div>
                    <div className="project-body">
                        {milestone.Description}
                    </div>
                </div>
                
            );
        });
    }

    render() {
        const { milestones } = this.props;
        return (
            <div className="wrap">
                <div>{milestones.Name}</div>
                <div>Milestones</div>
                
                {this.renderMilestones()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { milestones: state.milestones };
}

export default connect(mapStateToProps, { fetchMilestones })(Milestones);