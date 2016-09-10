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
  ToastAndroid,
  TouchableOpacity,
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
      schoolId: "edu-vn.camemis.de",
      //schoolId: "pro2.school.camemis.home",
    };
  }
  componentWillMount(){
    t.setLanguage(this.props.schoolSetting.LANGUAGE);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.schoolSetting.LANGUAGE !== nextProps.schoolSetting.LANGUAGE) {
      t.setLanguage(nextProps.schoolSetting.LANGUAGE);
    }
  }
  checkSchool = () => {
    this.props.checkSchool(this.state.schoolId).then(() => {
      if(this.props.schoolId.length > 0){
        this.props.navigator.push({name:'signin'});
      }else{
        ToastAndroid.show("Not correct. Please try again.", ToastAndroid.SHORT)
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
          </View>
          <ScrollView keyboardShouldPersistTaps={false}>
            <View style={styles.contentStyle}>
              <Text style={styles.label}>{t.SCHOOL_ID}:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter School ID"
                blurOnSubmit = {true}
                onChangeText={(text) => this.setState({schoolId:text})}
                value={this.state.schoolId}
              />
              <Text style={styles.label}>{t.LANGUAGE}:</Text>
              <Picker
                style={[styles.input, styles.picker]}
                mode='dropdown'
                selectedValue={this.props.schoolSetting.LANGUAGE}
                onValueChange={(lang) => this.props.saveSetting('LANGUAGE', lang)}>
                <Picker.Item label="ខ្មែរ" value="kh" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Vietnamese" value="vn" />
              </Picker>
              <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:"#4682B4", padding:10, borderRadius: 25}} onPress={()=>{this.checkSchool()}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent:"center", alignItems: "center"}}>
                  <Icon name="sign-in" size={30} color="#fff" />
                  <Text style={{color:'#FFFFFF', fontSize: 16, marginLeft:10}}>{t.CONTINUE}</Text>
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
        marginTop: 10,
        marginBottom: 10,
        // width:250,
        // alignSelf: 'center',
        // color: '#000000',
    },
    picker: {

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

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const mapStateToProps = (state) => {
  return {
    schoolSetting: state.schoolSetting,
    schoolId: state.school.schoolId,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SchoolLogin);
