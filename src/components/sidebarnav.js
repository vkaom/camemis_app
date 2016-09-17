'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    PixelRatio,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuItem from '../components/menuItem';
import t from '../languages/menu';
var widthSideBar = 280;
class CamemisSideBarNav extends Component{
    constructor(props) {
      super(props);
      this.state = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        tab: 'dashboard',
        menu: 'main-menu',
      };
    }
    componentWillMount(){
      t.setLanguage(this.props.schoolSetting.LANGUAGE);
    }
    _changeRoute = (route) => {
        this.setState({tab: route});
        this.props.navigator.push({name:route});
        this.props.loggle();
    }
    _logout = () => {
        this.props.logout();
    }
    _switchMenu(){
      var menu = this.state.menu == 'main-menu' ? 'school-menu' : 'main-menu';
      this.setState({menu: menu});
    }
    viewsideBarStyle(){
      return( {
          backgroundColor:'#FFF',
          width:widthSideBar,
          flexDirection:'column',
          paddingTop:0,
          shadowColor: '#ccc',
          shadowOpacity: 1.0,
      });
    }
    _renderMenu(){
      switch (this.state.menu) {
        case 'school-menu':
          return this._renderSchoolMenu();
          break;
        case 'main-menu':
        default:
          return this._renderMainMenu();
      }
    }
    _renderMainMenu(){
      return(
        <View style={styles.wrapperdropdown}>
          <MenuItem
            title={t.DASHBOARD}
            icon="tachometer"
            selected={this.state.tab === 'dashboard'}
            onPress={this._changeRoute.bind(this, 'dashboard')}
          />
          <MenuItem
            title={t.ACADEMIC}
            icon="graduation-cap"
            selected={this.state.tab === 'academic'}
            onPress={this._changeRoute.bind(this, 'academic')}
            style={{backgroundColor: 'green'}}
          />
          <MenuItem
            title={t.SCHEDULE}
            icon="calendar-check-o"
            selected={this.state.tab === 'schedule'}
            onPress={this._changeRoute.bind(this, 'schedule')}
          />
          <MenuItem
            title={t.ATTENDANCE}
            icon="pencil"
            selected={this.state.tab === 'attendance'}
            onPress={this._changeRoute.bind(this, 'attendance')}
          />
          <MenuItem
            title={t.DISCIPLINE}
            icon="paw"
            selected={this.state.tab === 'discipline'}
            onPress={this._changeRoute.bind(this, 'discipline')}
          />
          <MenuItem
            title={t.TRANSCRIPT}
            icon="star-o"
            selected={this.state.tab === 'transcript'}
            onPress={this._changeRoute.bind(this, 'transcript')}
          />
          <MenuItem
            title={t.LOGOUT}
            icon="sign-out"
            selected={false}
            onPress={this._logout.bind(this)}
          />
        </View>
      );
    }
    _renderSchoolMenu(){
      return(
        <View style={styles.wrapperdropdown}>
        <MenuItem
          title={t.CLASS + " 01"}
          icon="paw"
          selected={this.state.tab === 'discipline'}
          onPress={this._changeRoute.bind(this, 'discipline')}
        />
        <MenuItem
          title={t.CLASS + " 02"}
          icon="star-o"
          selected={this.state.tab === 'transcript'}
          onPress={this._changeRoute.bind(this, 'transcript')}
        />
        </View>
      );
    }
    render() {
      var menuTypeIcon = this.state.menu == 'main-menu' ? 'caret-down' : 'caret-up';
      return(
        <ScrollView style={this.viewsideBarStyle()}>
          <View style={{flex:1, padding:15, backgroundColor: '#4682B4'}}>
            <Image
              source={require('../images/av1.png')}
              style={styles.profileImg}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{color:'#fff', marginTop:10}}>{this.props.login.firstname + ' ' + this.props.login.lastname + '\n' + 'khlouk.rada@gmail.com'}</Text>
              <TouchableHighlight onPress={()=>{this._switchMenu()}} underlayColor="#4682B6" style={{paddingLeft:10, paddingRight:10,paddingTop:5,paddingBottom:5}}>
                <Icon style={{color:'#fff', fontSize: 16,}} name={menuTypeIcon} />
              </TouchableHighlight>
            </View>
          </View>
          {this._renderMenu()}
        </ScrollView>
      );
    }
}
const styles = StyleSheet.create({
  wrapperdropdown: {
      flexDirection: 'column',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderBottomColor: '#CDCDCD',
      paddingTop: 10,
  },
  schoolStyle: {
      flexDirection: 'row',
      paddingTop: 22,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: '#4682B4',
      borderBottomColor: '#CDCDCD',
      justifyContent: 'center',
      alignItems: 'center'
  },
  schoolStyleText: {
      color:'#FFF',
      fontSize:18,
      marginLeft:10
  },
  profileImg: {
      width: 70,
      height: 70,
      borderRadius:40
  },
  schoolStyleImageProf: {
      paddingTop:20,
      paddingBottom:20,
      justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    login: state.login,
    school: state.school,
    schoolSetting: state.schoolSetting,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CamemisSideBarNav);
