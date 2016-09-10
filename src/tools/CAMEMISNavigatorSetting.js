'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BackAndroid,
  Navigator,
} from 'react-native';
import Signin from '../components/signin';
//import Setting from '../components/setting';
import SchoolLogin from '../components/schoolLogin';
const ROUTES = {
    signin: Signin,
    //setting: Setting,
    SchoolLogin: SchoolLogin
};
class CAMEMISNavigatorSetting extends Component {
    constructor(props){
        super(props);
        this._handleBackButton = this._handleBackButton.bind(this);
        this.renderScene = this.renderScene.bind(this);
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
      var initialRoute = "SchoolLogin";
      if(this.props.schoolId.length == 0){
        initialRoute = "SchoolLogin";
      }else if(this.props.login.tokenId.length == 0){
        initialRoute = "signin";
      }
      return(
        <Navigator
            ref="navigator"
            initialRoute={{name: initialRoute}}
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
const mapStateToProps = (state) => {
  return {
    login: state.login,
    schoolId: state.school.schoolId
  }
}
export default connect(mapStateToProps)(CAMEMISNavigatorSetting);
