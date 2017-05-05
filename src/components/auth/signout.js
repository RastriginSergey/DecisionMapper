import {connect} from 'react-redux';
import React, {Component} from 'react';
import {signout} from '../../actions/auth';
import {clearFavorites} from '../../actions/pokemons';

class Signout extends Component {
    componentWillMount() {
        this.props.clearFavorites();
        this.props.signout();
    }

    render() {
        return (
            <h1>Sorry to see you go...</h1>
        )
    }
}

export default connect(null, {signout, clearFavorites})(Signout);
