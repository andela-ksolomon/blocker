import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/Home';


export default (
  <Route path="/" components={App}>
    <IndexRoute component={Home} />
  </Route>
);
