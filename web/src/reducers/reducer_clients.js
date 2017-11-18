import _ from 'lodash';
import { FETCH_CLIENTS, FETCH_CLIENT, DELETE_CLIENT } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_CLIENT:
            return _.omit(state, action.payload);
        case FETCH_CLIENT:
            const client = action.payload.data;
            return { ...state, [client.id]: client }
        case FETCH_CLIENTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}