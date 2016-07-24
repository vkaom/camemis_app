/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
    Modal,
    DatePickerIOS,
    DatePickerAndroid,
    ScrollView,
    LayoutAnimation,
    View
} from 'react-native';
import moment from 'moment';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = class Transcript extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <StudentTranscript />
    );
  }
}
class StudentTranscript extends Component {
  constructor(props){
    super(props);
    var myScoreData = [{RT: 'RT', Score: 'Score', Subject: 'Subject', Date:'Date',color:'#4682B4'},
                      {RT: '123', Score: '98', Subject: 'Math', Date:'30/05/2016',color:'#ccc'},
                      {RT: '1346', Score: '90', Subject: 'Science', Date:'25/05/2016',color:'#ccc'},
                      {RT: '45454', Score: '80', Subject: 'English', Date:'29/05/2016',color:'#ccc'},
                      {RT: '65354', Score: '69', Subject: 'Computer', Date:'24/05/2016',color:'#ccc'},
                      {RT: '7643', Score: '79', Subject: 'Cemestry', Date:'19/05/2016',color:'#ccc'}];

    var mySubjectData = [{Sub: 'Subject', Average: 'Average', Rank: 'Rank', Remark:'Remark',color:'#4682B4'},
                      {Sub: 'Khmer', Average: '89.87', Rank: '2', Remark:'Very Good',color:'#333'},
                      {Sub: 'Science', Average: '89.98', Rank: '1', Remark:'Good', color:'#333'},
                      {Sub: 'IT', Average: '89', Rank: '1', Remark:'Good',color:'#333'},
                      {Sub: 'Science', Average: '89', Rank: '5', Remark:'Very Good',color:'#333'},
                      {Sub: 'Khmer', Average: '90.01', Rank: '8', Remark:'Good',color:'#333'}];
    this.state = {
        dataScoreSource: ds.cloneWithRows(myScoreData),
        dataSubjectSource: ds.cloneWithRows(mySubjectData),
        modalVisible: false,
        selectedIndex: 0,
        date: new Date(),
        displaydate: moment().format('ddd, Do MMMM YYYY'),
        timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.barStyle}>
            <TouchableHighlight
                style={[styles.buttonStyle,{backgroundColor:(this.state.selectedIndex==0)?'#4682B4':'#f0f8ff',}]}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(0);}}>
              <View><Text style={{color:(this.state.selectedIndex==0)?'#fff':'#000'}}>Score</Text></View>
            </TouchableHighlight>

            <TouchableHighlight
                style={[styles.buttonStyle,{backgroundColor:(this.state.selectedIndex==1)?'#4682B4':'#f0f8ff',}]}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(1);}}>
              <View><Text style={{color:(this.state.selectedIndex==1)?'#fff':'#000'}}>Average</Text></View>
            </TouchableHighlight>

            <TouchableHighlight
                style={[styles.buttonStyle,{backgroundColor:(this.state.selectedIndex==2)?'#4682B4':'#f0f8ff',}]}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(2);}}>
              <View><Text style={{color:(this.state.selectedIndex==2)?'#fff':'#000'}}>1st Semester</Text></View>
            </TouchableHighlight>

            <TouchableHighlight
                style={[styles.buttonStyle,{backgroundColor:(this.state.selectedIndex==3)?'#4682B4':'#f0f8ff',}]}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(3);}}
                >
              <View><Text style={{color:(this.state.selectedIndex==3)?'#fff':'#000'}}>2nd Semester</Text></View>
            </TouchableHighlight>
        </View>
        <View>
          {this.renderScene()}
        </View>
      </ScrollView>
    );
  }

  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        //newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        this._onDateChange(date);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
  renderScene(){
    switch (this.state.selectedIndex) {
      case 0://score
        return(<View style={{paddingTop:10}}>
              <ListView
                  dataSource={this.state.dataScoreSource}
                  renderRow={(rowData)=>this.renderViewScore(rowData)}
                />
            </View>
            );
        break;
      case 1://subject average
        return(<View style={{paddingTop:10}}>
              <ListView
                  dataSource={this.state.dataSubjectSource}
                  renderRow={(rowData)=>this.renderViewAverage(rowData)}
                />
            </View>
            );
        break;
      case 2://1st Semester
          return(<View style={{paddingTop:10}}>
                <ListView
                    dataSource={this.state.dataSubjectSource}
                    renderRow={(rowData)=>this.renderViewAverage(rowData)}
                  />
              </View>
              );
          break;
      case 3://2nd Semester
          return(<View style={{paddingTop:10}}>
                <ListView
                    dataSource={this.state.dataSubjectSource}
                    renderRow={(rowData)=>this.renderViewAverage(rowData)}
                  />
              </View>
              );
          break;
      default:
        return(<View style={{paddingTop:10}}>
              <ListView
                  dataSource={this.state.dataScoreSource}
                  renderRow={(rowData)=>this.renderView(rowData)}
                />
            </View>
            );
        break;

    }
  }
  renderViewScore(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['RT']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Score']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Subject']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Date']}</Text>
            </View>
        </View>
      );
  }
  renderViewAverage(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Sub']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Average']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Rank']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Remark']}</Text>
            </View>
        </View>
      );
  }
  renderView(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Sub']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Tu']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['We']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Thu']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Fr']}</Text>
            </View>
        </View>
      );
  }
  renderRow(rowData) {
      return(
        <View style={{flexDirection:'row',padding:10, backgroundColor:rowData['color'],marginBottom:5,marginTop:5,borderRadius:5}}>
            <View style={{width:70,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#fff'}}>{rowData['starttime']}</Text>
              <Text style={{color:'#fff',marginTop:8,marginBottom:8}}>To</Text>
              <Text style={{color:'#fff'}}>{rowData['endtime']}</Text>
            </View>
            <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
              <Text style={{color:'#fff'}}>{rowData['subject']}</Text>
              <Text style={{color:'#fff'}}>{rowData['room']}</Text>
              <Text style={{color:'#fff'}}>{rowData['teacher']}</Text>
              {this.currectScedule(rowData['subject'])}
            </View>
        </View>
      );
  }

  _onChange(event){
    LayoutAnimation.linear();
    this.setState({
      selectedIndex: event,
    });
  }
  _onDateChange(date) {
    this.setState({
        date: date,
        displaydate:moment(date).format('ddd, Do MMMM YYYY')
    });
  }
  _setModalVisible(visible) {
    this.setState({
        modalVisible: visible
      });
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    barStyle: {
      flex:1,flexDirection:'row',
      backgroundColor:'#f0f8ff',
      justifyContent:'space-around',
      alignItems:'center',
      paddingTop:5,
      paddingBottom:5
    },
    modalContainer: {
      flex: 1,
      padding: 20,
      paddingTop: 80,
    },
    innerModal: {
      borderRadius: 10,
    },
    buttonStyle: {
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:5,
      paddingRight:5,
      borderRadius:5
    }

});
