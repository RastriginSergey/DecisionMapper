import {AUTH_TYPES} from '../types';

export const signin = ({email, password}, history) => (dispatch, getState) => {
    const ROOT_URL = "http://localhost:3000";

    let options = {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch(`${ROOT_URL}/signin`, options)
        .then(response => response.json())
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
    const ROOT_URL = "http://localhost:3000";

    let options = {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        },
    };

    fetch(`${ROOT_URL}/signup`, options)
        .then(response => response.json())
        .then(({token, error}) => {
            console.log(token, error)

            if (token) {
                localStorage.setItem('token', token);
                dispatch({type: AUTH_TYPES.AUTH_USER});
            } else if (error) {
                dispatch({type: AUTH_TYPES.AUTH_ERROR, error: error})
            }
        })
        .catch(error => dispatch({type: AUTH_TYPES.AUTH_ERROR, error: error.message}))
};

export const signout = () => (dispatch, getState) => {
    // delete token from localStorage
    localStorage.removeItem('token');
    // dispatch an action
    dispatch({type: AUTH_TYPES.UNAUTH_USER});
};
