import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import main from './public/main.css';
import setAuthorizationToken from './utils/setAuthorizationToken';
import AuthenticationActions from './actions/loginActions';

import routes from './routes';
import ConfigureStore from './store/ConfigureStore';

const store = ConfigureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(AuthenticationActions.setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));