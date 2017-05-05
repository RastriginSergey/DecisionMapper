import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pokemon from './pokemon';
import {fetchPokemons} from '../actions/pokemons';
import uuid from 'uuid';

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.filterPokemons = this.filterPokemons.bind(this);
    }

    filterPokemons() {
        const filterByName = (pokemon) => {
            const pattern = new RegExp(`^${this.props.filter}`);
            return pattern.test(pokemon.name);
        };


        const filterByType = (pokemon) => {
            const storeTypes = this.props.filteredTypes;

            if (storeTypes.length) {
                const matches = pokemon.types.filter(item => storeTypes.indexOf(item.type.name) !== -1);
                return !!matches.length;
            } else {
                return true;
            }
        };

        const list = this.props.list;
        if (list && list.length) {
            return list.filter(filterByName).filter(filterByType).map(pokemon => {
                return <Pokemon {...pokemon} key={pokemon.name}/>
            });
        }
    }

    render() {
        return (
            <div className="Pokemons-container">{this.filterPokemons()}</div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        list: state.pokemons.list,
        filter: state.filter,
        filteredTypes: state.filteredTypes
    }
};

export default connect(mapStateToProps, {fetchPokemons})(PokemonList);