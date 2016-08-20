'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import t from '../languages/setting';
import {
      StyleSheet,
      Text,
      TextInput,
      TouchableHighlight,
      Image,
      View,
      Modal,
      ScrollView,
      Picker,
      PixelRatio,
      TouchableWithoutFeedback,
} from 'react-native';

import BottonIcon from './buttonIcon';
import CamemisLogo from './camhead';
import Icon from 'react-native-vector-icons/FontAwesome';
class setting extends Component{
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        SCHOOL_NAME: this.props.schoolSetting.SCHOOL_NAME,
        MOBILE_URL: this.props.schoolSetting.MOBILE_URL,
        MOBILE_CODE: this.props.schoolSetting.MOBILE_CODE,
        LANGUAGE: this.props.schoolSetting.LANGUAGE,
        key: '',
        selcted: {'icon':'bomb' ,'name':'setting'}
      };
    }
    componentWillMount(){
      t.setLanguage(this.props.schoolSetting.LANGUAGE)
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.schoolSetting.LANGUAGE !== nextProps.schoolSetting.LANGUAGE) {
        t.setLanguage(nextProps.schoolSetting.LANGUAGE)
      }
    }
    render() {
      return(<View style={styles.container}>
                  <View style={styles.topVeiwStyle}>
                      <TouchableWithoutFeedback onPress={this.goBack}>
                        <View style={styles.topicon}>
                          <Icon name="chevron-left" size={18} color="#ffffff" />
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={styles.topTitle}>
                        <Image
                          source={require('../images/logo.png')}
                          />
                        <Text style={styles.topVeiwText}>Mobile Settings</Text>
                      </View>
                  </View>
                  <ScrollView style={styles.contentStyle}>
                    <View><Text style={{paddingBottom: 20,fontSize:18}}>Mobile School CAMEMIS Settings:</Text></View>
                    <TouchableHighlight onPress={() => {this.setModalSetting(true,'SCHOOL_NAME')}}>
                      <View style={styles.rowViewStyle}>
                        <Icon name="university" size={22} color="#4169e1" style={{marginRight:25}}/>
                        <View style={{flexDirection: 'column',}}>
                          <Text style={{fontSize:16,marginBottom:2}}>School Name</Text>
                          <Text style={{fontSize:12}}>{this.state.SCHOOL_NAME}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.setModalSetting(true,'MOBILE_URL')}}>
                      <View style={styles.rowViewStyle}>
                        <Icon name="bomb" size={22} color="#4169e1" style={{marginRight:25}}/>
                        <View style={{flexDirection: 'column',}}>
                          <Text style={{fontSize:16,marginBottom:2}}>Mobile Url</Text>
                          <Text style={{fontSize:12}}>{this.state.MOBILE_URL}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.setModalSetting(true,'MOBILE_CODE')}}>
                      <View style={styles.rowViewStyle}>
                        <Icon name="code" size={22} color="#4169e1" style={{marginRight:25}}/>
                        <View style={{flexDirection: 'column',}}>
                          <Text style={{fontSize:16,marginBottom:2}}>Mobile Code</Text>
                          <Text style={{fontSize:12}}>{this.state.MOBILE_CODE}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.setModalSetting(true,'LANGUAGE')}}>
                      <View style={styles.rowViewStyle}>
                        <Icon name="language" size={22} color="#4169e1" style={{marginRight:25}}/>
                        <View style={{flexDirection: 'column',}}>
                          <Text style={{fontSize:16,marginBottom:2}}>{t.LANGUAGE}</Text>
                          <Text style={{fontSize:12}}>{this.state.LANGUAGE}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    {this.modalDisplay()}
                  </ScrollView>
            </View>);
    }
    modalDisplay(){
        return(<Modal
                animationType={"slide"}
                transparent={false}
                onRequestClose={() => {alert("Modal has been closed.")}}
                visible={this.state.modalVisible}>
                 <View style={styles.modalContainter}>
                     <View style={styles.topVeiwModalStyle}>
                         <View style={styles.topTitle}>
                            <Icon name={this.state.selcted['icon']}
                                  size={22} color="#ffffff"
                                  style={{marginRight:25}}/>
                            <Text style={styles.topVeiwText}>
                                  {this.state.selcted['name']} Settings
                            </Text>
                         </View>
                     </View>

                    <ScrollView style={{padding: 20,}}>
                        {this.fieldType()}
                        <View style={{marginTop:20,}}>
                          <TouchableHighlight
                              onPress={() => {this.saveSetting()}}
                              style={{backgroundColor:'#6495ed'
                                      ,alignItems:'center'
                                      ,justifyContent: 'center'
                                      ,padding:10
                                      ,borderRadius:5
                                      ,marginBottom:10}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon name="check-circle-o" size={18} color="#FFF" />
                              <Text style={{fontFamily: 'Arial', fontSize: 18, color: '#ffffff'}}> Ok</Text>
                            </View>
                          </TouchableHighlight>
                          <TouchableHighlight
                              onPress={() => {this.cancelSetting()}}
                              style={{backgroundColor:'#6495ed'
                                      ,alignItems:'center'
                                      ,justifyContent: 'center'
                                      ,padding:10
                                      ,borderRadius:5
                                      ,marginBottom:20}}>
                            <View style={{flexDirection:'row'}}>
                              <Icon name="ban" size={18} color="#FFF"/>
                              <Text style={{fontFamily: 'Arial', fontSize: 18, color: '#ffffff'}}> Cancel</Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                    </ScrollView>
                 </View>
              </Modal>);
    }
    fieldType(){
        switch (this.state.key) {
          case 'SCHOOL_NAME':
              return(
                  <TextInput
                    style={styles.input}
                    placeholder={this.state.selcted['name']}
                    onChangeText={(text) => this.setState({SCHOOL_NAME:text})}
                    value={this.state.SCHOOL_NAME}
                    />
              );
            break;
          case 'MOBILE_CODE':
              return(
                  <TextInput
                    style={styles.input}
                    placeholder={this.state.selcted['name']}
                    onChangeText={(text) => this.setState({MOBILE_CODE:text})}
                    value={this.state.MOBILE_CODE}/>
              );
            break;
          case 'MOBILE_URL':
              return(
                  <TextInput
                    style={styles.input}
                    placeholder={this.state.selcted['name']}
                    onChangeText={(text) => this.setState({MOBILE_URL:text})}
                    value={this.state.MOBILE_URL}/>
              );
            break;
          case 'LANGUAGE':
              return(
                    <Picker
                      style={{justifyContent: 'space-around',height: 50,marginTop: -10,}}
                      mode='dropdown'
                      selectedValue={this.state.LANGUAGE}
                      onValueChange={(lang) => this.setState({LANGUAGE: lang})}>
                      <Picker.Item label="Khmer" value="kh" />
                      <Picker.Item label="English" value="en" />
                      <Picker.Item label="Vietnamese" value="vn" />
                    </Picker>
              );
            break;
        }
    }

    saveSetting(){
      switch (this.state.key) {
        case 'SCHOOL_NAME':
          this.props.saveSetting(this.state.key,this.state.SCHOOL_NAME);
          break;
        case 'MOBILE_CODE':
          this.props.saveSetting(this.state.key,this.state.MOBILE_CODE);
          break;
        case 'MOBILE_URL':
          this.props.saveSetting(this.state.key,this.state.MOBILE_URL);
          break;
        case 'LANGUAGE':
          this.props.saveSetting(this.state.key,this.state.LANGUAGE);
          break;
      }
      this.setState({modalVisible: !this.state.modalVisible});
    }
    cancelSetting(){
        switch (this.state.key) {
          case 'SCHOOL_NAME':
            this.setState({SCHOOL_NAME: this.props.schoolSetting[this.state.key]});
            break;
          case 'MOBILE_CODE':
            this.setState({MOBILE_CODE: this.props.schoolSetting[this.state.key]});
            break;
          case 'MOBILE_URL':
            this.setState({MOBILE_URL: this.props.schoolSetting[this.state.key]});
            break;
          case 'LANGUAGE':
            this.setState({LANGUAGE: this.props.schoolSetting[this.state.key]});
            break;
        }

        this.setState({modalVisible: !this.state.modalVisible});
    }
    getIconandName(_v){
        var a = {};
        switch (_v) {
          case 'SCHOOL_NAME':
            a = {icon:'university',name:'School Name'};
            break;
          case 'MOBILE_CODE':
            a = {icon:'code',name:'Mobile Code'};
            break;
          case 'MOBILE_URL':
            a = {icon:'bomb',name:'Mobile Url'};
            break;
          case 'LANGUAGE':
            a = {icon:'language',name:'Countries and Language'};
            break;
        }
        return a;
    }
    setModalVisible(visible) {
      this.setState({
          modalVisible: visible
        });
    }
    setModalSetting (visible,viewName) {
      var a = this.getIconandName(viewName);
      this.setState({
          modalVisible: visible,
          key: viewName,
          selcted: a
        });
    }
    goBack = () =>{
      this.props.navigator.pop();
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
    },
    contentStyle:{
        padding: 10,
    },
    input:{
        padding: 4,
        borderColor: '#c0c0c0',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        color: '#000000',
    },
    topVeiwStyle:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4682B4',
        shadowColor: "#000000",

    },
    topTitle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topicon:{
        width: 30,
        marginLeft: 0,
        marginRight: 5
    },
    topVeiwText:{
        color: '#FFFFFF',
        fontSize: 18,
    },
    modalContainter:{
        flex: 1,
        backgroundColor: '#f0f8ff',
        shadowColor: "#000000",
    },
    topVeiwModalStyle:{
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4682B4',
        shadowColor: "#000000",

    },
    rowViewStyle: {
        flexDirection: 'row',
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
        alignItems: 'center'
    }
});
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const mapStateToProps = (state) => {
  return {schoolSetting:state.schoolSetting}
}
export default connect(mapStateToProps,mapDispatchToProps)(setting);
