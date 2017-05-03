import {AUTH_TYPES, POKEMON_TYPES} from '../types';
import {reducer as form} from 'redux-form';
import {combineReducers} from 'redux';

function auth(state = {}, action) {
    switch (action.type) {
        case AUTH_TYPES.AUTH_USER:
            return {isAuthenticated: true, error: ''};
        case AUTH_TYPES.UNAUTH_USER:
            return {isAuthenticated: false, error: ''};
        case AUTH_TYPES.AUTH_ERROR:
            return {isAuthenticated: action.isAuthenticated, error: action.error};
        default:
            return state;
    }
}

function pokemons(state = [], action) {
    switch (action.type) {
        case POKEMON_TYPES.FETCH_POKEMONS:
            return [...action.pokemons];
        default:
            return state;
    }
}

function page(state = 1, action) {
    switch (action.type) {
        case POKEMON_TYPES.CHANGE_PAGE:
            return action.page;
        default:
            return state;
    }
}

function fetching(state = false, action) {
    switch(action.type) {
        case POKEMON_TYPES.START_FETCHING:
            return true;
        case POKEMON_TYPES.END_FETCHING:
            return false;
        default: return state;
    }
}


export default combineReducers({
    auth,
    pokemons,
    fetching,
    page,
    form
});