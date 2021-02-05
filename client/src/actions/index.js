import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FEATCH_STREAMS,
    FEATCH_STREAM,
    DELETE_STREAM,
    EDITE_STREAM
} from './types';
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    // getState() we have getState finction as argument and 
    //it  will return entire state object and i'm going to access the of 
    //piece of state on there and just pluck out the user ID
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    //I created our history navigation history objec and import it into outr index.js 
    // We can manually store and manipulate programmatically out navigatin

    history.push('/');

};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FEATCH_STREAMS, payload: response.data })
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FEATCH_STREAM, payload: response.data })
};

export const editeStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDITE_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push("/");
};

