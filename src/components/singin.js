'use strict';
import React, { Component } from 'react';
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

module.exports = class signin extends Component{
  constructor(props) {
    super(props);
  }
  singIn = () => {
    ///log in succeeded reset route navigator
    this.props.navigator.immediatelyResetRouteStack([{name:'mymenu'}]);
  }
  settingCamemis = () => {
    this.props.navigator.push({name:'setting'});
  }
  contentContainer(){
    return(
            <View style={styles.container}>
                <View style={styles.topVeiwStyle}>
                  <CamemisLogo text={'CAMEMIS Education'}/>
                  <View style={styles.topicon}>
                    <Icon.Button name="cog" size={16} color="#4682B4"  onPress={this.settingCamemis} backgroundColor="#ffffff">Settings</Icon.Button>
                  </View>
                </View>
                <ScrollView>
                  <View style={styles.contentStyle}>
                    <View style={{paddingBottom:20}}><Text style={{fontSize:18,textDecorationLine: 'none',color:'#000000'}}>Long in to Aceess Your Informations</Text></View>
                    <Text style={{color:'#000000'}}>User Name:</Text>
                    <TextInput style={styles.input} />
                    <Text style={{color:'#000000'}}>Password:</Text>
                    <TextInput style={styles.input} secureTextEntry={true}/>
                    <View style={{marginTop:10, alignItems:'center', justifyContent: 'center',}}>
                      <BottonIcon text={'Sign In'} colorText={'#FFFFFF'} onPress={this.singIn} name={'sign-in'} backgroundColor={'#4682B4'}/>
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
