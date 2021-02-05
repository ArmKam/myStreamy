import _ from 'lodash';
import {
    CREATE_STREAM,
    FEATCH_STREAMS,
    FEATCH_STREAM,
    DELETE_STREAM,
    EDITE_STREAM

} from '../actions/types';

export const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case FEATCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case FEATCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDITE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};