import {POKEMON_TYPES} from '../types';
import config from '../../config';


export const fetchPokemons = (page = 1, limit = 3, offset = 0) => (dispatch, getState) => {
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
        .then(result => {
            dispatch({type: POKEMON_TYPES.FETCH_POKEMONS, pokemons: result});
            dispatch({type: POKEMON_TYPES.END_FETCHING})
        })
};