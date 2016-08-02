'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
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
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:8,justifyContent:'center'}}>
              <Text style={{fontSize:32,color:'#4682B4',fontWeight: 'bold'}}>CAMEMIS</Text>
            </View>
            <View style={{justifyContent:'center',flex:2}}>
              <ActivityIndicator
                  animating={true}
                  color="#4682B4"
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
