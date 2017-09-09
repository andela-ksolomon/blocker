import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/Main';
import Home from './components/Home';
import Threads from './components/Threads'

export default (
  <Route path="/" components={App}>
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} /> 
    <Route path="/main" component={Main} />
    <Route path="/threads" component={Threads} />
  </Route>
);
