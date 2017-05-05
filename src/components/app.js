import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Favorites from './pages/favorites';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Signout from './auth/signout';
import NotFound from './pages/notFound';
import Pokemons from './pages/pokemons';
import requireAuth from './hoc/require_authentication';
import Spinner from './spinner';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import uuid from 'uuid';
import css from '../css/main.styl';


class App extends Component {
    render() {
        const renderLinks = () => {
            if (this.props.auth.isAuthenticated) {
                return [
                    <NavLink key={uuid()} className="nav-link" to="/favorites">Favorites</NavLink>,
                    <NavLink key={uuid()} className="nav-link" to="/signout">Sing Out</NavLink>
                ];
            } else {
                return [
                    <NavLink key={uuid()} className="nav-link" to="/signin">Sign In</NavLink>,
                    <NavLink key={uuid()} className="nav-link" to="/signup">Sign Up</NavLink>
                ];
            }
        };

        return (
            <Router>
                <div className="grid">
                    <header>
                        <NavLink key={uuid()} to="/list/1" className="nav-link">Pokemons</NavLink>
                        {renderLinks()}
                    </header>

                    <Spinner/>

                    <div className="main container-fluid">
                        <Switch>
                            <Route path="/list/:page" component={Pokemons}/>
                            <Route path="/favorites" component={requireAuth(Favorites)}/>
                            <Route path="/signin" component={Signin}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/signout" component={Signout}/>
                            <Redirect from='/' to='/list/1'/>
                            <Route component={NotFound}/>

                        </Switch>
                    </div>

                    <footer></footer>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(App);