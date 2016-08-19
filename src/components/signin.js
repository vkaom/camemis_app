'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Navigator,
} from 'react-native';

import Botton from './button';
import BottonIcon from './buttonIcon';
import CamemisLogo from './camhead';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from '../languages/signin';
class signin extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    setLanguage(this.props.language);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      setLanguage(nextProps.language);
    }
  }
  singIn = () => {
    this.props.doLogin();
    ///log in succeeded reset route navigator
    //this.props.navigator.immediatelyResetRouteStack([{name:'mymenu'}]);
  }
  settingCamemis = () => {
    this.props.navigator.push({name:'setting'});
  }
  contentContainer(){
    return(
            <View style={styles.container}>
                <View style={styles.topVeiwStyle}>
                  <CamemisLogo text={t.APP_NAME}/>
                  <View style={styles.topicon}>
                    <Icon.Button name="cog" size={16} color="#4682B4"  onPress={this.settingCamemis} backgroundColor="#ffffff">{t.SETTINGS}</Icon.Button>
                  </View>
                </View>
                <ScrollView>
                  <View style={styles.contentStyle}>
                    <View style={{paddingBottom:20}}><Text style={{fontSize:18,textDecorationLine: 'none',color:'#000000'}}>Long in to Aceess Your Informations</Text></View>
                    <Text style={{color:'#000000'}}>{t.USERNAME}:</Text>
                    <TextInput style={styles.input} />
                    <Text style={{color:'#000000'}}>{t.PASSWORD}:</Text>
                    <TextInput style={styles.input} secureTextEntry={true}/>
                    <View style={{marginTop:10, alignItems:'center', justifyContent: 'center',}}>
                      <BottonIcon text={t.SIGN_IN} colorText={'#FFFFFF'} onPress={()=>{this.singIn()}} name={'sign-in'} backgroundColor={'#4682B4'}/>
                    </View>
                  </View>
                </ScrollView>
            </View>);
  }
  render() {
    return(<View style={styles.container}>
              {this.contentContainer()}
            </View>
          );
  }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
    },
    contentStyle:{
        alignItems: 'center',
        marginTop: 15,
        flex: 1,
    },
    input:{
        padding: 4,
        height: 40,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width:250,
        alignSelf: 'center',
        color: '#000000',
    },
    topVeiwStyle:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4682B4',
        shadowColor: "#000000",
        justifyContent: 'space-between',

    },
    topicon:{
        width: 100,
        marginLeft: 5,

    },
});
function setLanguage(lang){
  switch (lang) {
    case 'Khmer':
      t.setLanguage('kh');
      break;
    case 'English':
      t.setLanguage('en');
      break;
    default:
  }
}
const mapStateToProps = (state) => {
  return {language: state.schoolSetting.LANGUAGE}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(signin);
