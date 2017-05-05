import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {addFavorite, removeFavorite} from '../actions/pokemons';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
    }

    remove() {
        const isAuthenticated = this.props.isAuthenticated;
        if (!isAuthenticated) {
            this.props.history.push('/signin');
        } else {
            this.props.removeFavorite(this.props.pokemon);
        }
    }

    add() {
        const isAuthenticated = this.props.isAuthenticated;
        if (!isAuthenticated) {
            this.props.history.push('/signin');
        } else {
            this.props.addFavorite(this.props.pokemon);
        }
    }


    render() {

        const favorites = this.props.favorites;
        const inFavorites = favorites.some(({name}) => name === this.props.pokemon.name);

        return (
            <div className="Favorite">
                <span onClick={this.add}
                      className={`glyphicon glyphicon-star-empty ${inFavorites ? 'hidden' : ''}`}
                      aria-hidden="true"/>
                <span onClick={this.remove}
                      className={`glyphicon glyphicon-star ${inFavorites ? '' : 'hidden'}`}
                      aria-hidden="true"/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        favorites: state.favorites
    }
};

export default withRouter(connect(mapStateToProps, {addFavorite, removeFavorite})(Favorite));