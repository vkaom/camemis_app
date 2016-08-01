'use strict';
import React, { Component } from 'react';
import {
  Platform,
  AppState,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
import PushNotification from 'react-native-push-notification';

var Signin = require('./components/signin');
var Setting = require('./components/setting');
var ChatList = require('./components/chatList');
import Mymenu from './components/menu';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import camemisApp from './reducers';
import {navOnDidFocus} from './actions/navigator';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const store = createStore(
  camemisApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);
var ROUTES = {
    signin: Signin,
    setting: Setting,
    mymenu: Mymenu,
    chatList: ChatList,
};

class main extends Component {
  constructor(props) {
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this.state={second:5};
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    PushNotification.configure({
      onNotification: function(notification) {
           console.log( 'NOTIFICATION:', notification );
       }
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange(AppState) {
      if (AppState === 'background'){
          console.log('this app is run background: '+this.state.second);
          PushNotification.localNotificationSchedule({
              message: "My Notification Message", // (required)
              date: new Date(Date.now() + (this.state.second * 1000)), // in 60 secs
              playSound: true,
              vibrate: true,
          });
      }
  }
  render() {
    return(
      <Provider store={store}>
          <Navigator
              initialRoute={{name: 'signin'}}
              renderScene={this.renderScene}
              configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
              onDidFocus={(route) => {
                store.dispatch(navOnDidFocus())
              }}
          />
      </Provider>
    );
  }
  renderScene(route, navigator){
    var Component = ROUTES[route.name];
    return (<Component route={route} navigator={navigator}/>);
  }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#808080',
    }

});

module.exports = main;
