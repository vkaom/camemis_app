/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    PixelRatio,
    RefreshControl,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import t from '../languages/academic';

class Academic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loaded: false,
    };
  }
  componentWillMount(){
    t.setLanguage(this.props.schoolSetting.LANGUAGE)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{padding:15,}}>
          <Text style={{fontSize:16, fontWeight: 'bold',}}>{t.CLASS_INFORMATION}</Text>
        </View>
        <View style={{paddingLeft:15, paddingRight: 15, backgroundColor:'white', marginRight:15, marginLeft:15}}>
          <View style={styles.row}>
            <Text style={{fontWeight:'bold'}}>{t.ACADEMIC_YEAR}:</Text>
            <Text>2015-2016</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight:'bold'}}>{t.GRADE}:</Text>
            <Text>Level 12</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight:'bold'}}>{t.CLASS}:</Text>
            <Text>Grade 12 A</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight:'bold'}}>{t.PHONE}:</Text>
            <Text>017 48 84 40</Text>
          </View>
          <View style={[styles.row,styles.lastRow]}>
            <Text style={{fontWeight:'bold'}}>{t.EMAIL}:</Text>
            <Text>info@camemis.com.kh</Text>
          </View>
        </View>
        <View style={{backgroundColor:'transparent',flex:1,padding:15, justifyContent:'space-between'}}>
          <View style={{flex:1,  backgroundColor:'#FFA300', marginBottom:10, height:90, justifyContent: 'center',alignItems:'center'}}>
            <Icon name="star-o" size={40} color="#ffffff" />
            <Text style={{color:'#fff', fontSize:16,}}>{t.STUDENT_LIST}</Text>
          </View>
          <View style={{flex:1, flexDirection: 'row', height:90}}>
            <View style={{flex:1, backgroundColor:'#4682B4',marginRight:10,height:90,justifyContent: 'center',alignItems:'center'}}>
              <Icon name="pencil" size={40} color="#ffffff" />
              <Text style={{color:'#fff', fontSize:16,}}>{t.TEACHER}</Text>
            </View>
            <View style={{flex:1, backgroundColor:'#4682B4',height:90,justifyContent: 'center',alignItems:'center'}}>
              <Icon name="graduation-cap" size={40} color="#ffffff" />
              <Text style={{color:'#fff', fontSize:16,}}>{t.SUBJECT}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#f1f1f1',
  },
  row:{
    flexDirection:'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop:10,
    paddingBottom: 10,
  },
  lastRow:{
    borderBottomWidth: 0
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const mapStateToProps = (state) => {
  return {schoolSetting:state.schoolSetting}
}
export default connect(mapStateToProps,mapDispatchToProps)(Academic);
