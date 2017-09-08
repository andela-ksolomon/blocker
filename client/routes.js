import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';


export default (
  <Route path="/" components={App}>
    <IndexRoute component={App} />
  </Route>
);
