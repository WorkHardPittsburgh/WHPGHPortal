import _ from 'lodash';
import { FETCH_MILESTONES, DELETE_MILESTONE } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case  DELETE_MILESTONE:
            return _.omit(state, action.payload);
        case FETCH_MILESTONES:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}