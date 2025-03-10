import { StyleSheet, Text, View, useWindowDimensions, ActivityIndicator, ScrollView} from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { useState,useEffect } from 'react';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { deleteJournalEntry, getJournalByUser } from '../apis'

const JournalSearchInput = ({userInfo,input,setInput}) => {
    const [userJournal, setUserJournal]=useState()
    const [isLoading, setIsLoading]=useState(true)
   
    useEffect(()=>{
        getJournalByUser(userInfo.email).then((data)=>{
          setUserJournal(data) 
          setIsLoading(false)
        })
      },[userJournal])


      const LoaderJournal = ({visible = false}) => {
        const {width, height} = useWindowDimensions();
        return (
          visible && (
            <View style={[styles.container, {height, width}]}>
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#55BEDF" />
                <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
              </View>
            </View>
          )
        );
      };

    return isLoading ? (
      <View style={{justifyContent: 'center', marginTop: '50%'}}>
         <LoaderJournal visible={true}/>
      </View>
       
        
      ):
      ( 
        <ScrollView >
          <View style={styles.journalCardContainer}>
      {userJournal.map((journal,index)=>{
        if(input === ''){
          return (
              <View style={styles.journalCard} >
                <Ionic name='trash' style={styles.trashIcon} size={20} onPress={() => deleteJournalEntry(journal._id)}/>
                  <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
                    <Text style={{marginHorizontal:10,fontSize:15,textAlign:'justify'}}>{journal.journalEntry}</Text>
                    <Text style={{marginHorizontal:10,fontSize:25,  alignSelf: 'flex-end'}}>{journal.happinessIndex <33 ?"😔": journal.happinessIndex<66 ? "😐": "😁"}</Text>
                    <View>
                      
                    </View>
              </View>
          )
        }
        if(journal.journalEntry.toLowerCase().includes(input.toLowerCase())){
            return (
                <View style={styles.journalCard} >
                  <Ionic name='trash' style={styles.trashIcon} size={20} onPress={() => deleteJournalEntry(journal._id)}/>
                     <Text style={styles.date}><SimpleDateTime dateSeparator="/"  showTime='0' meridians="1" format="DMY">{journal.date}</SimpleDateTime></Text>
                      <Text style={{marginHorizontal:10,fontSize:15, textAlign:'justify'}}>{journal.journalEntry}</Text>
                      <Text style={{marginHorizontal:10,fontSize:25,  alignSelf: 'flex-end'}}>{journal.happinessIndex <33 ?"😔": journal.happinessIndex<66 ? "😐": "😁"}</Text>
                </View>
            )
        }
})}
    </View>
        </ScrollView>
    
  )
}

export default JournalSearchInput

const styles = StyleSheet.create({
    journalCardContainer:{
        paddingHorizontal:20,
        marginTop:20
      },
      journalCard: {
        padding:10,
        height:180,
        borderBottomWidth:0.2,
        borderTopWidth:0.2,
        marginVertical:10,
        borderRadius:10,
        borderColor:'#B2BDB5',
       backgroundColor:'white',
       shadowOffset:{
        width:0,
        height:4
       },shadowOpacity:0.15,

       
      },
      date:{
        marginHorizontal:10,
        marginVertical:10,
        alignSelf:'flex-start',
        marginTop:-20,
      },
      trashIcon:{
        alignSelf: 'flex-end',
        margin:5
      },
      loader: {
        height: 70,
        backgroundColor: '#F7F6F8',
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
      },
      container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
      },
      
})