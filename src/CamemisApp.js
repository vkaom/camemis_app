import React, { Component } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions';
import PushNotification from 'react-native-push-notification';
import CAMEMISStart from './components/menu';
import Singin from './components/signin';
import CAMEMISNavigatorSetting from './tools/CAMEMISNavigatorSetting';

class CamemisApp extends Component {
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

          //  PushNotification.localNotificationSchedule({
          //      message: "My Notification Message", // (required)
          //      date: new Date(Date.now() + (this.state.second * 1000)), // in 60 secs
          //      playSound: true,
          //      vibrate: true,
          //  });
       }
   }
   render(){
     if(!this.props.login){
       return(<CAMEMISNavigatorSetting />);
     }else{
       return(<CAMEMISStart />);
     }
   }
}
const mapStateToProps = (state) => {
  return {login:state.login}
}
function mapDispatchToPros(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
module.exports = connect(mapStateToProps,mapDispatchToPros)(CamemisApp);
