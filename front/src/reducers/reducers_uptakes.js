import _ from 'lodash';
import { FETCH_UPTAKES } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_UPTAKES:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}