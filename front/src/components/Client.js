import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

// import EditClient from './Client_Edit';
import { fetchClient } from '../actions';
import '../css/clients.css';

class Client extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchClient(id);
    }

    render() {
        const { client } = this.props;

        return (
            <div>
                Clients go here!
            </div>
        );
    }
}

function mapStateToProps({ clients }, ownProps) {
    return { client: clients[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchClient })(Client);
// export default Client;