import React, {Component} from 'react';
import {setFilter} from '../actions/pokemons';
import {connect} from 'react-redux';

class PokemonFilter extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.props.setFilter(e.target.value);
    }

    render() {
        return (
            <input type="text" className="form-control search-input" onChange={this.onInputChange} placeholder="Filter pokemons by name..."/>
        )
    }

}

export default connect(null, {setFilter})(PokemonFilter);