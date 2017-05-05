import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import storeFactory from './store';
// AppContainer is a necessary wrapper component for HMR
import {AppContainer} from 'react-hot-loader';
import App from './components/app';
import {AUTH_TYPES} from './types';

const store = storeFactory();
// store.subscribe(saveState);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({type: AUTH_TYPES.AUTH_USER});
}

window.store = store;

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./index', () => {
        render()
    });
}
