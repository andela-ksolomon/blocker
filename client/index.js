import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import main from './public/css/main.css';
import './public/css/threads.css';

import routes from './routes';
import ConfigureStore from './store/ConfigureStore';

const store = ConfigureStore();

render(<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
