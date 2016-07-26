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
     View
 } from 'react-native';
 import moment from 'moment';
 import ScrollableTabView from 'react-native-scrollable-tab-view';
 import Icon from 'react-native-vector-icons/FontAwesome';

 var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

 var dataAllData = [
    {Type: 'Type', Punishment:'Punishment', Done:'Done',color:'#4682B4'},
     {Type: 'Cheating', Punishment:'Warning', Done:'yes',color:'#DDDDDD'},
     {Type: 'Brokend Window', Punishment:'Cleaning', Done:'no',color:'#fff8dc'},
     {Type: 'Fight In Class', Punishment:'Warning And Education', Done:'yes',color:'#DDDDDD'},

 ];
 var data2ndData = [
   {Type: 'Type', Punishment:'Punishment', Done:'Done',color:'#4682B4'},
    {Type: 'Cheating', Punishment:'Warning', Done:'yes',color:'#DDDDDD'},
    {Type: 'Brokend Window', Punishment:'Cleaning', Done:'no',color:'#fff8dc'},
 ];
 var data1stData = [
   {Type: 'Type', Punishment:'Punishment', Done:'Done',color:'#4682B4'},
    {Type: 'Fight In Class', Punishment:'Warning And Education', Done:'yes',color:'#DDDDDD'},
 ];
 module.exports = class Discipline extends Component {

   constructor(props){
       super(props);
       this.state = {
           dataAllSource: ds.cloneWithRows(dataAllData),
           data2ndSource: ds.cloneWithRows(data2ndData),
           data1stSource: ds.cloneWithRows(data1stData),
       };
   }
   renderTabBar(TabView){
     return(
       <View style={[styles.tabs]}>
           <TouchableOpacity key='0' onPress={() => TabView.goToPage(0)} style={styles.tab}>
               <View>
                 <Text style={{color:TabView.activeTab === 0 ? '#4682B4' : 'rgb(0,0,0)'}}>
                   <Icon
                     name='map-o'
                     size={20}
                     color={TabView.activeTab === 0 ? '#4682B4' : 'rgb(0,0,0)'}
                   /> All
                 </Text>
             </View>
           </TouchableOpacity>
           <TouchableOpacity key='1' onPress={() => TabView.goToPage(1)} style={styles.tab}>
              <View>
                 <Text style={{color:TabView.activeTab === 1 ? '#4682B4' : 'rgb(0,0,0)'}}>
                   <Icon
                     name='map'
                     size={20}
                     color={TabView.activeTab === 1 ? '#4682B4' : 'rgb(0,0,0)'}
                   /> 1st
                 </Text>
             </View>
           </TouchableOpacity>
           <TouchableOpacity key='2' onPress={() => TabView.goToPage(2)} style={styles.tab}>
             <View>
                <Text style={{color:TabView.activeTab === 2 ? '#4682B4' : 'rgb(0,0,0)'}}>
                  <Icon
                    name='map'
                    size={20}
                    color={TabView.activeTab === 2 ? '#4682B4' : 'rgb(0,0,0)'}
                  /> 2nd
                </Text>
            </View>
           </TouchableOpacity>
       </View>
     );
   }
   render() {
     return (<ScrollableTabView
               style={{marginTop: 0, }}
               initialPage={0}
               renderTabBar={(TabView) => this.renderTabBar(TabView)}
               >
               <ScrollView tabLabel="calendar" style={styles.tabView}>
                   <ListView
                       dataSource={this.state.dataAllSource}
                       renderRow={(rowData)=>this.renderViewDialy(rowData)}
                     />
               </ScrollView>
               <ScrollView tabLabel="calendar-o" style={styles.tabView}>
                   <ListView
                       dataSource={this.state.data1stSource}
                       renderRow={(rowData)=>this.renderViewDialy(rowData)}
                     />
               </ScrollView>
               <ScrollView tabLabel="calendar-o" style={styles.tabView}>
                   <ListView
                       dataSource={this.state.data2ndSource}
                       renderRow={(rowData)=>this.renderViewDialy(rowData)}
                     />
               </ScrollView>
             </ScrollableTabView>
           );
   }
   renderViewDialy(rowData) {
       return(
         <View style={{
                   flexDirection:'row',
                   backgroundColor:rowData['color'],
                   borderTopWidth:1,
                   borderTopColor:'#fff'}}>
             <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
               <Text style={{color:'#000',textAlign:'center'}}>{rowData['Type']}</Text>
             </View>
             <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
               <Text style={{color:'#000',textAlign:'center'}}>{rowData['Punishment']}</Text>
             </View>
             <View style={{alignItems:'center',justifyContent:'center',flex:2,paddingTop:15,paddingBottom:15}}>
               <Text style={{color:'#000',textAlign:'center'}}>{rowData['Done']}</Text>
             </View>
         </View>
       );
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
