import {connect} from 'react-redux';
import React, {Component} from 'react';
import Pagination from '../pagination'
import {fetchPokemons, fetchFavorites} from '../../actions/pokemons';
import {withRouter} from 'react-router';
import PokemonList from '../pokemon-list';
import PokemonNameFilter from '../pokemon-name-filter';
import PokemonTypeFilter from '../pokemon-type-filter'


class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
    }

    updatePage(page) {
        if (page) {
            this.props.fetchPokemons(page);
        }
    }

    componentWillReceiveProps(nextProps) {
        const page = parseInt(nextProps.match.params.page);
        this.updatePage(page);

    }

    componentWillMount() {
        this.props.fetchFavorites();
        const page = parseInt(this.props.match.params.page);
        this.updatePage(page);
    }


    render() {
        return (
            <div>
                <div className="filters-wrapper">
                    <PokemonNameFilter/>
                    <PokemonTypeFilter/>
                </div>
                <PokemonList/>
                <Pagination/>
            </div>
        )
    }
}

export default withRouter(connect(null, {fetchPokemons, fetchFavorites})(Pokemons));
