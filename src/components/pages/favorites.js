import {connect} from 'react-redux';
import React, {Component} from 'react';
import FavoritesList from '../favorites-list';


class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FavoritesList/>
        )
    }
}

export default Favorites;
