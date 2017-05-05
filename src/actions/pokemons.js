import {POKEMON_TYPES} from '../types';
import config from '../../config';


export const fetchPokemons = (page = 1, limit = 9, offset = 0) => (dispatch, getState) => {
    dispatch({type: POKEMON_TYPES.CHANGE_PAGE, page});
    dispatch({type: POKEMON_TYPES.START_FETCHING});

    if (page > 1) {
        offset = limit * (page - 1);
    }

    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    fetch(`${config.serverURL}/api/v1/pokemons?limit=${limit}&offset=${offset}`, options)
        .then(response => response.json())
        .then(parsed => {
            dispatch({type: POKEMON_TYPES.FETCH_POKEMONS, payload: {list: parsed.result, count: parsed.count}});
            dispatch({type: POKEMON_TYPES.END_FETCHING})
        })
};

export const setFilter = (query) => {
    return {
        type: POKEMON_TYPES.SET_FILTER,
        payload: query
    }
};

export const setTypes = (types) => {
    return {
        type: POKEMON_TYPES.SET_TYPES,
        payload: types
    }
};

export const addFavorite = (pokemon) => (dispatch, getState) => {
    dispatch({type: POKEMON_TYPES.START_FETCHING});
    fetch(`${config.serverURL}/api/v1/favorite`, {
        method: 'POST',
        body: JSON.stringify({"name": pokemon.name}),
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    }).then(response => {
        dispatch({type: POKEMON_TYPES.ADD_FAVORITE, payload: pokemon});
        dispatch({type: POKEMON_TYPES.END_FETCHING});
    }).catch(error => {
        dispatch({type: POKEMON_TYPES.END_FETCHING});
        console.log(error)
    })
};

export const removeFavorite = (pokemon) => (dispatch, getState) => {
    dispatch({type: POKEMON_TYPES.START_FETCHING});
    fetch(`${config.serverURL}/api/v1/favorite`, {
        method: 'DELETE',
        body: JSON.stringify({"name": pokemon.name}),
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    }).then(response => {
        dispatch({type: POKEMON_TYPES.REMOVE_FAVORITE, payload: pokemon});
        dispatch({type: POKEMON_TYPES.END_FETCHING});
    }).catch(error => {
        dispatch({type: POKEMON_TYPES.END_FETCHING});
        console.log(error);
    })
};

export const fetchFavorites = () => (dispatch, getState) => {
    dispatch({type: POKEMON_TYPES.START_FETCHING});
    fetch(`${config.serverURL}/api/v1/favorite`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(result => {
            dispatch({type: POKEMON_TYPES.FETCH_FAVORITES, payload: result.pokemons});
            dispatch({type: POKEMON_TYPES.END_FETCHING});
        }).catch(err => console.log(err));
};

export const clearFavorites = () => {
    return {
        type: POKEMON_TYPES.CLEAR_FAVORITES
    }
};

