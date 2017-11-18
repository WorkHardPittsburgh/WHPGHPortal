import _ from 'lodash';
import { FETCH_PROJECTS, FETCH_PROJECT } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_PROJECT:
            const project = action.payload.data;
            return { ...state, [project.id]: project };
        case FETCH_PROJECTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}