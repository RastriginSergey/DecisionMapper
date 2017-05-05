import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFavorites} from '../actions/pokemons';
import Pokemon from './pokemon';

class FavoritesList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchFavorites();
    }

    render() {
        return (
            <div className="Pokemons-container">{this.props.favorites.map(pokemon => {
                return <Pokemon {...pokemon} key={pokemon.name}/>
            })}</div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        favorites: state.favorites
    }
};

export default connect(mapStateToProps, {fetchFavorites})(FavoritesList);