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
  ToastAndroid,
  TouchableOpacity,
  Picker,
} from 'react-native';
import Botton from './button';
import BottonIcon from './buttonIcon';
import CamemisLogo from './camhead';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from '../languages/signin';

class signin extends Component{
  constructor(props) {
    super(props);
    this.state = {

      username: "62E4-4206",
      password: "Test12345",

      // username: "554E-EE13",
      // password: "One2345678",
      role: 1
    };
  }
  componentWillMount(){
    // console.log('test');
    // this.socket.on('getOnlineUser', function (data, disconnectedId) {
    //   console.log(data);
    // });
    t.setLanguage(this.props.language);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      t.setLanguage(nextProps.language);
    }
  }
  singIn = () => {
    this.props.signin(this.state.username, this.state.password, this.state.role).then((resp) => {
      if(resp.success == false){
        ToastAndroid.show("Not correct", ToastAndroid.SHORT)
      }
    });
  }
  forgetSchool = () => {
    this.props.populateSchoolInfo({});
    this.props.navigator.push({name:'SchoolLogin'});
  }
  settingCamemis = () => {
    this.props.navigator.push({name:'setting'});
  }
  contentContainer(){
    return(
            <View style={styles.container}>
                <View style={styles.topVeiwStyle}>
                  <CamemisLogo text={t.APP_NAME}/>
                </View>
                <ScrollView>
                  <View style={styles.contentStyle}>
                    <Text style={styles.label}>{t.USERNAME}:</Text>
                    <TextInput style={styles.input} onChangeText={(text) => this.setState({username:text})} value={this.state.username} />
                    <Text style={styles.label}>{t.PASSWORD}:</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => this.setState({password:text})} value={this.state.password} />
                    <Text style={styles.label}>{t.ROLE}:</Text>
                    <Picker
                      style={[styles.input, styles.picker]}
                      mode='dropdown'
                      selectedValue={'1'}
                      onValueChange={(role) => {this.setState({role: role})}}
                      >
                      <Picker.Item label={t.PARENT} value="3" />
                      <Picker.Item label={t.TEACHER} value="2" />
                      <Picker.Item label={t.STUDENT} value="1" />
                    </Picker>
                    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:"#4682B4", padding:10, borderRadius: 25}} onPress={()=>{this.singIn()}}>
                      <View style={{flex:1, flexDirection: 'row', justifyContent:"center", alignItems: "center"}}>
                        <Icon name="sign-in" size={30} color="#fff" />
                        <Text style={{color:'#FFFFFF', fontSize: 16, marginLeft:10}}>{t.SIGN_IN}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:"#4682B4", padding:10, borderRadius: 25, marginTop:5,}} onPress={()=>{this.forgetSchool()}}>
                      <View style={{flex:1, flexDirection: 'row', justifyContent:"center", alignItems: "center"}}>
                        <Icon name="sign-out" size={30} color="#fff" />
                        <Text style={{color:'#FFFFFF', fontSize: 16, marginLeft:10}}>{t.CHANGE_SCHOOL}</Text>
                      </View>
                    </TouchableOpacity>
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
      alignItems: 'stretch',
      marginTop: 0,
      padding:30,
      flex: 1,
    },
    label: {
      fontSize: 16,
    },
    input:{
        // padding: 4,
        // height: 40,
        // borderColor: '#DDDDDD',
        // borderWidth: 1,
        // borderRadius: 5,
        // margin: 5,
        // width:250,
        // alignSelf: 'center',
        // color: '#000000',
        marginTop: 10,
        marginBottom: 10,
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
    picker: {

    },
});
const mapStateToProps = (state) => {
  return {language: state.schoolSetting.LANGUAGE, tokenId: state.login.tokenId}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(signin);
