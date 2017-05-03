import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Profile from './pages/profile';
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
                    <NavLink key={uuid()} className="nav-link" to="/profile">Profile</NavLink>,
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
                        <NavLink key={uuid()} to="/list" className="nav-link">Pokemons</NavLink>
                        {renderLinks()}
                    </header>

                    <Spinner/>

                    <div className="main">
                        <Switch>
                            <Route path="/list/:page?" component={Pokemons}/>
                            <Route path="/profile" component={requireAuth(Profile)}/>
                            <Route path="/signin" component={Signin}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/signout" component={Signout}/>

                            <Route component={NotFound}/>
                        </Switch>
                    </div>

                    <footer>

                    </footer>
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