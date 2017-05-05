import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {setTypes} from '../actions/pokemons';
import 'react-select/dist/react-select.css';

const TYPES = [
    {value: "normal", label: "normal"},
    {value: "fighting", label: "fighting"},
    {value: "flying", label: "flying"},
    {value: "poison", label: "poison"},
    {value: "ground", label: "ground"},
    {value: "rock", label: "rock"},
    {value: "bug", label: "bug"},
    {value: "ghost", label: "ghost"},
    {value: "steel", label: "steel"},
    {value: "fire", label: "fire"},
    {value: "water", label: "water"},
    {value: "grass", label: "grass"},
    {value: "electric", label: "electric"},
    {value: "psychic", label: "psychic"},
    {value: "ice", label: "ice"},
    {value: "dragon", label: "dragon"},
    {value: "dark", label: "dark"},
    {value: "fairy", label: "fairy"},
    {value: "unknown", label: "unknown"},
    {value: "shadow", label: "shadow"},
];


const PokemonTypeFilter = (props) => {
    function logChange(data) {
        const values = data.map(item => item.value);
        props.setTypes(values);
    }

    return (
        <Select
            name="types-select"
            value={props.filteredTypes}
            options={TYPES}
            onChange={logChange}
            multi={true}
        />
    )
};

const mapStateToProps = (state,props) => {
    return {
        filteredTypes: state.filteredTypes
    }
};



export default connect(mapStateToProps, {setTypes})(PokemonTypeFilter);