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
    ScrollView,
    TouchableOpacity,
    ListView,
    DatePickerIOS,
    Modal,
    DatePickerAndroid,
    RefreshControl,
    ActivityIndicator,
    View
} from 'react-native';
import moment from 'moment';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimerMixin from 'react-timer-mixin';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var dataDialyData = [
    {Date: 'Date',Time: 'Time', Type: 'Type', Subject:'Subject', isDialy:true,color:'#4682B4'},
    {Date: '27/07/2016', Time: '14:00-15:00', Type: 'Absence', Subject:'Science', isDialy:true,color:'#DDDDDD'},
    {Date: '27/07/2016', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},];
var dataAllData = [
    {Date: 'Date',Time: 'Time', Type: 'Type', Subject:'Subject', isDialy:true,color:'#4682B4'},
    {Date: '27/07/2016', Time: '14:00-15:00', Type: 'Absence', Subject:'Science', isDialy:true,color:'#DDDDDD'},
    {Date: '27/07/2016', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '25/07/2016\n to \n 25/07/2016', Time: '', Type: 'Permistion', Subject:'', isDialy:false,color:'#fff8dc'},
    {Date: '24/07/2016', Time: '15:00-16:00', Type: 'Late', Subject:'Khmer', isDialy:true,color:'#DDDDDD'},
    {Date: '22/07/2016\n to \n 23/07/2016', Time: '', Type: 'No Permistion', Subject:'', isDialy:false,color:'#fff8dc'},
    {Date: '27/09/2015', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '25/09/2015\n to \n 25/07/2016', Time: '', Type: 'sick', Subject:'', isDialy:false,color:'#fff8dc'},
    {Date: '24/07/2015', Time: '14:00-15:00', Type: 'Absence', Subject:'English', isDialy:true,color:'#DDDDDD'},
    {Date: '24/07/2015', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '17/08/2015\n to \n 17/09/2015', Time: '', Type: 'Absence', Subject:'', isDialy:false,color:'#fff8dc'},
];
var data2ndData = [
    {Date: 'Date',Time: 'Time', Type: 'Type', Subject:'Subject', isDialy:true,color:'#4682B4'},
    {Date: '27/07/2016', Time: '14:00-15:00', Type: 'Absence', Subject:'Science', isDialy:true,color:'#DDDDDD'},
    {Date: '27/07/2016', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '25/07/2016\n to \n 25/07/2016', Time: '', Type: 'Permistion', Subject:'', isDialy:false,color:'#fff8dc'},
    {Date: '24/07/2016', Time: '15:00-16:00', Type: 'Late', Subject:'Khmer', isDialy:true,color:'#DDDDDD'},
    {Date: '22/07/2016\n to \n 23/07/2016', Time: '', Type: 'No Permistion', Subject:'', isDialy:false,color:'#fff8dc'},
];
var data1stData = [
    {Date: 'Date',Time: 'Time', Type: 'Type', Subject:'Subject', isDialy:true,color:'#4682B4'},
    {Date: '27/09/2015', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '25/09/2015\n to \n 25/07/2016', Time: '', Type: 'sick', Subject:'', isDialy:false,color:'#fff8dc'},
    {Date: '24/07/2015', Time: '14:00-15:00', Type: 'Absence', Subject:'English', isDialy:true,color:'#DDDDDD'},
    {Date: '24/07/2015', Time: '13:00-14:00', Type: 'Late', Subject:'Math', isDialy:true,color:'#DDDDDD'},
    {Date: '17/08/2015\n to \n 17/09/2015', Time: '', Type: 'Absence', Subject:'', isDialy:false,color:'#fff8dc'},
];
module.exports = class Attendance extends Component {

  constructor(props){
      super(props);
      this.state = {
          dataDialySource: ds.cloneWithRows(dataDialyData),
          dataAllSource: ds.cloneWithRows(dataAllData),
          data2ndSource: ds.cloneWithRows(data2ndData),
          data1stSource: ds.cloneWithRows(data1stData),
          date: new Date(),
          displaydate: moment().format('DD/MM/YYYY'),
          modalVisible: false,
          animating: true,
          loading: false,
          refreshing: false,
      };

  }
  _onRefresh() {
    this.setState({refreshing: true});
    TimerMixin.setTimeout(
      () => {
      this.setState({refreshing: false});
      },
      800
    );
  }

  renderTabBar(TabView){
    return(
      <View style={[styles.tabs]}>
          <TouchableOpacity key='0' onPress={() => TabView.goToPage(0)} style={styles.tab}>
              <View>
                <Text style={{color:TabView.activeTab === 0 ? '#4682B4' : 'rgb(0,0,0)'}}>
                    <Icon
                      name='calendar-check-o'
                      size={20}
                      color={TabView.activeTab === 0 ? '#4682B4' : 'rgb(0,0,0)'}
                    /> Dialy
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity key='1' onPress={() => TabView.goToPage(1)} style={styles.tab}>
              <View>
                <Text style={{color:TabView.activeTab === 1 ? '#4682B4' : 'rgb(0,0,0)'}}>
                  <Icon
                    name='calendar'
                    size={20}
                    color={TabView.activeTab === 1 ? '#4682B4' : 'rgb(0,0,0)'}
                  /> All
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity key='2' onPress={() => TabView.goToPage(2)} style={styles.tab}>
              <View>
                <Text style={{color:TabView.activeTab === 2 ? '#4682B4' : 'rgb(0,0,0)'}}>
                  <Icon
                    name='calendar-o'
                    size={20}
                    color={TabView.activeTab === 2 ? '#4682B4' : 'rgb(0,0,0)'}
                  /> 1st
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity key='3' onPress={() => TabView.goToPage(3)} style={styles.tab}>
              <View>
                <Text style={{color:TabView.activeTab === 3 ? '#4682B4' : 'rgb(0,0,0)'}}>
                  <Icon
                    name='calendar-o'
                    size={20}
                    color={TabView.activeTab === 3 ? '#4682B4' : 'rgb(0,0,0)'}
                  /> 2nd
                </Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <ScrollableTabView
              style={{marginTop: 0, }}
              initialPage={0}
              renderTabBar={(TabView) => this.renderTabBar(TabView)}
              >
              <View tabLabel="calendar-check-o" style={styles.tabView}>
                  <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
                  >
                    {this.renderLisView(0)}
                  </ScrollView>
                  {this.renderSelectDisplayDate()}
              </View>
              <ScrollView tabLabel="calendar" style={styles.tabView}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }
                >
                {this.renderLisView(1)}
              </ScrollView>
              <ScrollView tabLabel="calendar-o" style={styles.tabView}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
              >
                {this.renderLisView(2)}
              </ScrollView>
              <ScrollView tabLabel="calendar-o" style={styles.tabView}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
              >
                {this.renderLisView(3)}
              </ScrollView>
            </ScrollableTabView>
          );
  }

  renderLisView(v){

          switch (v) {
            case 0:
              return(
                <ListView
                    dataSource={this.state.dataDialySource}
                    renderRow={(rowData)=>this.renderViewDialy(rowData)}
                  />
              );
              break;
              case 1:
                return(
                  <ListView
                      dataSource={this.state.dataAllSource}
                      renderRow={(rowData)=>this.renderViewDialy(rowData)}
                    />
                );
                break;
              case 2:
                return(
                  <ListView
                      dataSource={this.state.data1stSource}
                      renderRow={(rowData)=>this.renderViewDialy(rowData)}
                    />
                );
              break;
              case 3:
                return(
                  <ListView
                      dataSource={this.state.data2ndSource}
                      renderRow={(rowData)=>this.renderViewDialy(rowData)}
                    />
                );
              break;
            default:

          }

  }
  renderViewDialy(rowData) {
      return(
        <View style={{
                  flexDirection:'row',
                  backgroundColor:rowData['color'],
                  borderTopWidth:1,
                  borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Date']}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Time']}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Type']}</Text>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Subject']}</Text>
            </View>
        </View>
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
                    <TouchableOpacity
                      style={{padding:10,borderRadius:10}}
                      onPress={()=>{this._setModalVisible(false)}}
                      >
                      <View><Text style={{color:'#ff4500'}}>Ok</Text></View>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
        </Modal>
      );
  }

  renderSelectDisplayDate(){
    if(Platform.OS === 'android'){
        return(
          <TouchableOpacity onPress={this.showPicker.bind(this, 'simple', {date: this.state.date})} style={{paddingBottom:10, width:150}}>
              <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'#4682B4'}}>
                      {this.state.displaydate}   <Icon
                        name='calendar-check-o'
                        size={20}
                        color='#4682B4'
                      />
                  </Text>
              </View>
          </TouchableOpacity>
        );
    }else if(Platform.OS === 'ios'){
        return(
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{this._setModalVisible(true)}} style={{paddingBottom:10, width:150}}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#4682B4'}}>
                        {this.state.displaydate}   <Icon
                          name='calendar-check-o'
                          size={20}
                          color='#4682B4'
                        />
                    </Text>
                </View>
            </TouchableOpacity>
            {this.modalDisplay()}
          </View>
        );
    }
  }

  _onDateChange(date) {
    this.setState({
        date: date,
        displaydate:moment(date).format('DD/MM/YYYY')
    });
  }
  _setModalVisible(visible) {
    this.setState({
        modalVisible: visible
      });
  }
  displayAll(){

  }
}

const styles = StyleSheet.create({

  tabView: {
    flex: 1,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
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
