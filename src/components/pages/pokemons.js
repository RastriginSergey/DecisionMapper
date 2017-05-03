import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchPokemons} from '../../actions/pokemons';
import Pokemon from '../pokemon';
import Pagination from '../pagination'

class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            searchText: '',
            tags: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pokemons: nextProps.pokemons.list})
    }

    onInputChange(e) {
        this.setState({searchText: e.target.value});
    }

    componentWillMount() {
        const page = parseInt(this.props.match.params.page) || 1;
        this.props.fetchPokemons(page);
    }

    render() {
        const pokemons = this.state.pokemons.filter(pokemon => {
            const pattern = new RegExp(`^${this.state.searchText.toLowerCase()}`);
            return pattern.test(pokemon.name);
        }).map(pokemon => {
            return <Pokemon {...pokemon} key={pokemon.name}/>
        });


        return (
            <div className="Pokemons">
                    <input type="text" className="Pokemons-filter form-control"
                           placeholder="Filter..."
                           autoComplete="off" onChange={this.onInputChange}/>


                <div className="Pokemons-container">{pokemons}</div>

                <Pagination/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        pokemons: state.pokemons
    }
}


export default connect(mapStateToProps, {fetchPokemons})(Pokemons);
