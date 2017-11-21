import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import App from './scenes/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

import './common/styles/common.css';

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

// react-router v4 moves the routing for child components into the parent themselves, closer to
// the angular 2+ style of full self-encapsulation. The only downside is not having a single
// place for routes anymore in apps with nested routing.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root'),
);
registerServiceWorker();
