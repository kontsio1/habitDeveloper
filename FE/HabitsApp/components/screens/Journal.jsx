import {StyleSheet, Text, FlatList, Image, View} from 'react-native'
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../apis'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';





const Journal = ({navigation,route }) => {
const [userJournal, setUserJournal]=useState()
const userInfo = route.params



  useEffect(()=>{
    getUserData(userInfo).then((data)=>{
      setUserJournal(data.dailyJournal) 
    })
  },[])
  
  const getChalNameFromCode =(challCode)=>{
    let newCodesArr = challCode.split("_")
    newCodesArr = newCodesArr.slice(2,3)
   
    return newCodesArr
    
}


  const data = userJournal
  const JournalCard = ({challengeName,journalEntry,date}) => (
    <View style={styles.item}>
       <SafeAreaView >
      <Image style={{ marginTop:-35, width: 100, height: 100, alignSelf:'center' }} source={{uri:'https://cdn-icons-png.flaticon.com/512/4312/4312464.png'}}/>
      <Text style={styles.challengeName}>{getChalNameFromCode(challengeName)}</Text>
      <Text style={styles.journalEntry}>"{journalEntry}"</Text>
      <Text style={styles.date}><SimpleDateTime dateSeparator="-"  showTime='0' meridians="1" format="DMY">{date}</SimpleDateTime></Text>
      <Ionicons style={{alignSelf:'center', fontSize:16,}} name='trash-outline' onPress={()=>{}}/>
</SafeAreaView> 
    </View>
  
  );


      
return (
  <FlatList numColumns={2} style={styles.container}     data={data}
  renderItem={({item}) => <JournalCard challengeName={item.challengeName} journalEntry={item.journalEntry} date={item.date} key={item.id}/>
}/>
  )
};

export default Journal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F7F6F8'
  },
  item: {
    backgroundColor: '#F7F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 5,
    borderWidth:7,
    width:'48%',
    margin:'1%',
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:30,
    padding:7,
    borderColor:'#345772'
  },
journalEntry:{
  textAlign:'center',
  fontStyle:'italic',
  margin:20,
  color:'black',
},
challengeName:{
  textAlign:'center',
  margin:8,
  fontWeight:'bold',
  color:'black',
},
date:{
  textAlign:'center',
  margin:8,
  color:'black',
}
})


















