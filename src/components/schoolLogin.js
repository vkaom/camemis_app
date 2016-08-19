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
  Picker,
  ToastAndroid
} from 'react-native';
import t from '../languages/schoolLogin';
import Botton from './button';
import BottonIcon from './buttonIcon';
import CamemisLogo from './camhead';
import Icon from 'react-native-vector-icons/FontAwesome';

class SchoolLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      //LANGUAGE: this.props.schoolSetting.LANGUAGE,
      SCHOOL_ID: this.props.schoolSetting.SCHOOL_ID,
    };
  }
  componentWillMount(){
    setLanguage(this.props.schoolSetting.LANGUAGE);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.schoolSetting.LANGUAGE !== nextProps.schoolSetting.LANGUAGE) {
      setLanguage(nextProps.schoolSetting.LANGUAGE);
    }
  }
  checkSchool = () => {
    this.props.checkSchool(this.state.SCHOOL_ID).then(() => {
      if(this.props.schoolSetting.SCHOOL_ID == "12345"){
        this.props.navigator.push({name:'signin'});
      }else{
        ToastAndroid.show("Not correct", ToastAndroid.SHORT)
      }
    });
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
                    <View style={{paddingBottom:20}}><Text style={{fontSize:18,textDecorationLine: 'none',color:'#000000'}}>Campus Prerequisites</Text></View>
                    <Text style={{color:'#000000'}}>{t.SCHOOL_ID}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter School ID"
                      onChangeText={(text) => this.setState({SCHOOL_ID:text})}
                      value={this.state.SCHOOL_ID}
                    />
                    <Text style={{color:'#000000'}}>{t.LANGUAGE}:</Text>
                    <Picker
                      style={styles.picker}
                      mode='dropdown'
                      selectedValue={this.props.schoolSetting.LANGUAGE}
                      onValueChange={(lang) => this.props.saveSetting('LANGUAGE', lang)}>
                      <Picker.Item label="Khmer" value="Khmer" />
                      <Picker.Item label="English" value="English" />
                      <Picker.Item label="Vietnamese" value="Vietnamese" />
                    </Picker>
                    <View style={{marginTop:10, alignItems:'center', justifyContent: 'center',}}>
                      <BottonIcon text={t.CONTINUE} colorText={'#FFFFFF'} onPress={()=>{this.checkSchool()}} name={'sign-in'} backgroundColor={'#4682B4'}/>
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
    picker: {
      width: 250
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

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const mapStateToProps = (state) => {
  return {schoolSetting: state.schoolSetting}
}
export default connect(mapStateToProps,mapDispatchToProps)(SchoolLogin);
