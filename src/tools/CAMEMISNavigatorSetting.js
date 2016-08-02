'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackAndroid,
  Navigator,
} from 'react-native';
import Signin from '../components/signin';
import Setting from '../components/setting';
const ROUTES = {
    signin: Signin,
    setting: Setting,
};
class CAMEMISNavigatorSetting extends Component {
    constructor(props){
        super(props);
        this._handleBackButton = this._handleBackButton.bind(this);
    }
    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    _handleBackButton(){
        const {navigator} = this.refs;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
          navigator.pop();
          return true;
        }
        return false;
    }
    render() {
      return(
        <Navigator
            ref="navigator"
            initialRoute={{name: 'signin'}}
            renderScene={this.renderScene}
            configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
        />
      );
    }
    renderScene(route, navigator){
      var Component = ROUTES[route.name];
      return (<Component route={route} navigator={navigator} />);
    }
}

export default connect()(CAMEMISNavigatorSetting);
