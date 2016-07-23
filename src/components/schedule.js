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

export default class Schedule extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <StudentSchedule />
    );
  }
}
class StudentSchedule extends Component {
  constructor(props){
    super(props);
    var myDialyData = [{starttime:'13:00PM',endtime:'14:00PM',subject:'Math',room:'RM_007',teacher:'Chun Veng',color:'#228b22'},
                      {starttime:'14:30PM',endtime:'15:30PM',subject:'Khmer',room:'RM_009',teacher:'Rada Klourk',color:'#1e90ff'},
                      {starttime:'15:40PM',endtime:'16:40PM',subject:'English',room:'RM_987',teacher:'Raskmey',color:'#20b2aa'},
                      {starttime:'16:45PM',endtime:'17:45PM',subject:'Science',room:'RM_987',teacher:'Chantra',color:'#4169e1'},
                      {starttime:'17:45PM',endtime:'18:45PM',subject:'Music',room:'RM_987',teacher:'Sor Veasna',color:'#ff6347'}];

    var myWeekData = [{time: '', Mon: 'Mo', Tu: 'Tu', We: 'We', Thu:'Th', Fr: 'Fr',color:'#4682B4'},
                      {time:'13:00\n14:00', Mon: 'Khmer', Tu: 'Science', 'We': 'IT', Thu:'Music', Fr: 'English',color:'#90ee90'},
                      {time:'14:30\n15:30', Mon: 'Science', Tu: 'Khmer', 'We': 'IT', Thu:'Music', Fr: 'Science',color:'#20b2aa'},
                      {time:'15:40\n16:40', Mon: 'IT', Tu: 'Science', 'We': 'Khmer', Thu:'Music', Fr: 'English',color:'#ff6347'},
                      {time:'16:45\n17:45', Mon: 'Science', Tu: 'English', 'We': 'Music', Thu:'IT', Fr: 'Science',color:'#228b22'},
                      {time:'17:45\n18:45', Mon: 'Khmer', Tu: 'Music', 'We': 'IT', Thu:'English', Fr: 'Khmer',color:'#20b2aa'}];
    this.state = {
      dataSource: ds.cloneWithRows(myDialyData),
      dataSourceWeek: ds.cloneWithRows(myWeekData),
      modalVisible: false,
      selectedIndex: 0,
      date: new Date(),
      displaydate: moment().format('ddd, Do MMMM YYYY'),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }
  buttonStyleDialy(){
      return({
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:15,
          paddingRight:15,
          backgroundColor:(this.state.selectedIndex==0)?'#4682B4':'#f0f8ff',
          borderRadius:5
      });
  }
  buttonStyleWeek(){
      return({
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:15,
          paddingRight:15,
          backgroundColor:(this.state.selectedIndex==1)?'#4682B4':'#f0f8ff',
          borderRadius:5
      });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.barStyle}>
            <TouchableHighlight
                style={this.buttonStyleDialy()}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(0);}}>
              <View><Text style={{color:(this.state.selectedIndex==0)?'#fff':'#000'}}>Dialy</Text></View>
            </TouchableHighlight>
            <View>
                {this.renderSelectDisplayDate()}
            </View>
            <TouchableHighlight
                style={this.buttonStyleWeek()}
                underlayColor="#4682B4"
                onPress={()=>{this._onChange(1);}}
                >
              <View><Text style={{color:(this.state.selectedIndex==1)?'#fff':'#000'}}>Week</Text></View>
            </TouchableHighlight>
        </View>
        <View>
          {this.renderScene()}
          {this.modalDisplay()}
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
    if(this.state.selectedIndex==0){
      return(<View style={{padding:5}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>this.renderRow(rowData)}
                  />
              </View>
            );
    }else{
      return(<View style={{paddingTop:10}}>
              <ListView
                  dataSource={this.state.dataSourceWeek}
                  renderRow={(rowData)=>this.renderWeekRow(rowData)}
                />
            </View>);
    }
  }
  currectScedule(time){
    if(time=='Math'){
      return(
          <Text style={{color:'#fff',backgroundColor:'#ff4500',padding:2,textAlign:'center',borderRadius:5}}>Now</Text>
      );
    }else {
      return;
    }
  }
  renderWeekRow(rowData) {
      return(
        <View style={{flexDirection:'row', backgroundColor:rowData['color']}}>
            <View style={{alignItems:'center',flex:1,paddingTop:5,paddingBottom:5, backgroundColor:'#333'}}><Text style={{color:'#fff',fontSize:10,textAlign:'center'}}>{rowData['time']}</Text></View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Mon']}</Text>
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
  renderSelectDisplayDate(){
    if(Platform.OS === 'android'){
        return(
          <TouchableHighlight onPress={this.showPicker.bind(this, 'simple', {date: this.state.date})} underlayColor="#fff" style={{padding:5}}>
            <Text style={{fontSize:16,color:'#4169e1'}}>{this.state.displaydate}</Text>
          </TouchableHighlight>
        );
    }
    if(Platform.OS === 'ios'){
        return(
          <TouchableHighlight onPress={()=>{this._setModalVisible(true)}} underlayColor="#fff" style={{padding:5}}>
            <Text style={{fontSize:16,color:'#4169e1'}}>{this.state.displaydate}</Text>
          </TouchableHighlight>
        );
    }
  }
  modalDisplay(){
      return(
        <Modal
          animationType={"none"}
          transparent={true}
          onRequestClose={() => {this.setState({modalVisible: false})}}
          visible={this.state.modalVisible}>
           <View style={[styles.modalContainer]}>
              <View style={[styles.innerModal, {backgroundColor: '#fff', padding: 20}]}>
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    onDateChange={(date)=>{this._onDateChange(date)}}
                  />
                  <View style={{alignItems:'center'}}>
                    <TouchableHighlight
                      style={{padding:10,borderRadius:10}}
                      onPress={()=>{this._setModalVisible(false)}}
                      >
                      <View><Text style={{color:'#ff4500'}}>Ok</Text></View>
                    </TouchableHighlight>
                </View>
              </View>
            </View>
        </Modal>
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

});
