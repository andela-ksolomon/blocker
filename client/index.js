import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import './public/css/main.css';
import './public/css/threads.css';
import setAuthorizationToken from './utils/setAuthorizationToken';
import AuthenticationActions from './actions/loginActions';

import Routes from './routes';
import ConfigureStore from './store/ConfigureStore';

const store = ConfigureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(AuthenticationActions.setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(<Provider store={store}>
    <Routes history={browserHistory} getState={store.getState} />
  </Provider>, document.getElementById('app'));