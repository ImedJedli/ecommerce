import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from './store';



const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE,
  title :["success","error","info","warning"]
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}{...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

