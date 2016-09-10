'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
var configureStore = require('./configureStore');
var CamemisApp = require('./CamemisApp');
//const store = configureStore();

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render() {
    if (this.state.isLoading) {
      return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor: '#4682B4'}}>
            <View style={{flex:8,justifyContent:'center'}}>
              <Image
                source={require('./images/camemis-logo-home.png')}
                style={{width:200, resizeMode: 'contain'}}
              />
            </View>
            <View style={{justifyContent:'center',flex:2}}>
              <ActivityIndicator
                  animating={true}
                  color="#fff"
                  size="large"
                />
            </View>
        </View>
      );
    }
    return(
      <Provider store={this.state.store}>
        <CamemisApp />
      </Provider>
    );
  }
}
module.exports = Main;
