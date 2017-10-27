import _ from 'lodash';
import { FETCH_TASKS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_TASKS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}