import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/Main';
import Home from './components/Home';
import Threads from './components/Threads';
import requireAuth from './utils/requireAuth';

export default class RTRouter extends React.Component {
  
    constructor() {
      super();
  
      this.requireAuth = this.requireAuth.bind(this);
      this.routes = (
        <Route path="/" components={App}>
          <IndexRoute component={Home} onEnter={ this.requireAuth } />
          <Route path="/home" component={Home} /> 
          <Route path="/main" component={requireAuth(Main)} />
          <Route path="/threads" component={requireAuth(Threads)} />
        </Route>
      )
    }
  
    requireAuth(nextState, replace) {
      const { getState, history } = this.props;
      const store = getState();
      if (store.loginReducer.isAuthenticated) {
        replace({ nextPathname: nextState.location.pathname }, '/main')
      }
    }
  
    render() {
      const { history } = this.props;
      return (
        <Router history={ history }>
          { this.routes }
        </Router>
      );
    }
  }