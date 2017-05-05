import {AUTH_TYPES} from '../types';
import config from '../../config';
const {serverURL} = config;

export const signin = ({email, password}, history) => (dispatch, getState) => {

    let options = {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch(`${serverURL}/signin`, options)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(({token}) => {
            if (token) {
                localStorage.setItem('token', token);
                dispatch({type: AUTH_TYPES.AUTH_USER});
                history.push('/profile');
            }
        })
        .catch(error => dispatch({type: AUTH_TYPES.AUTH_ERROR, error: error.message}))
};

export const signup = ({email, password}) => (dispatch, getState) => {

    let options = {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch(`${serverURL}/signup`, options)
        .then(response => response.json())
        .then(({token, error}) => {
            console.log(token, error);

            if (token) {
                localStorage.setItem('token', token);
                dispatch({type: AUTH_TYPES.AUTH_USER});
            } else if (error) {
                dispatch({type: AUTH_TYPES.AUTH_ERROR, error: error})
            }
        })
        .catch(error => dispatch({type: AUTH_TYPES.AUTH_ERROR, error: error.message}))
};

export const facebookAuth = () => (dispatch, getState) => {
    fetch(`${serverURL}/facebook`)
        .then(response => window.open(response.url,'_blank'));
};

export const signout = () => (dispatch, getState) => {
    // delete token from localStorage
    localStorage.removeItem('token');
    // dispatch an action
    dispatch({type: AUTH_TYPES.UNAUTH_USER});
};
