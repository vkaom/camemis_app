'use strict';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
var configureStore = require('./configureStore');
var CamemisApp = require('./CamemisApp');
const store = configureStore();

class Main extends Component {
  render() {
    return(
      <Provider store={store}>
        <CamemisApp />
      </Provider>
    );
  }
}
module.exports = Main;
