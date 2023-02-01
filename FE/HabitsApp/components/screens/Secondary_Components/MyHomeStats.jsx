import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView} from "react-native"
import ProgressCircle from 'react-native-progress/Circle'

export const MyHomeStats =({challenges, optimisticTimes, setOptimisticTimes})=>{
    const ongoingChallengesArr = challenges.filter((chal)=>{
        return Boolean(chal[Object.keys(chal)[0]].times)
      })
    // console.log(ongoingChallengesArr, "ongoing in stats")

    return (
        <ScrollView height={'50%'}>
            <Text style={styles.title}>Ongoing challenges:</Text>{
            ongoingChallengesArr.map((chal)=>{
                let times = (chal[Object.keys(chal)[0]].times % 42)

                let colourBadge = ""
                let timesForNextbadge =0
                if (times<7) {
                    colourBadge = "#CD7F32"
                    timesForNextbadge = 7
                } else if (times<21) {
                    colourBadge = "#C0C0C0"
                    timesForNextbadge = 21
                } else if (times<42) {
                    colourBadge = "#dac206"
                    timesForNextbadge = 42
                }

                return (<View key={Math.random()} style={styles.container}>
                        <View style={styles.smallContainer}>
                            <View style={styles.evenSmallerContainer}>
                                <Text>{chal[Object.keys(chal)[0]].title}</Text>
                                <View flexDirection={"row"} alignItems={"center"} marginTop={5}><Text>{`Streak: ${chal[Object.keys(chal)[0]].streak}`}</Text><Image source={require("../../../assets/flame-icon.png")} style={{height:30, width:30}}/></View>
                                <Text>{`Times completed: ${chal[Object.keys(chal)[0]].times}`}</Text>
                            </View>
                            <ProgressCircle color={colourBadge} size={50}  thickness={10} borderWidth={2} showsText={false} progress={times/timesForNextbadge} borderColor={"#78ACB1"} textStyle={{fontSize:13, fontWeight:"bold", color:"#78ACB1"}} marginLeft={5}/>
                        </View>
                    </View>)
            })
        }</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {justifyContent: "center", alignItems:'center',},
    smallContainer: {flexDirection: "row", alignItems: "center", margin: 15, borderWidth:5, borderRadius:20,borderColor:"#71979A", padding:10}, 
    title: {alignSelf: "center",marginBottom: 5, fontSize: 18, marginTop:20},
    evenSmallerContainer: {flexDirection: "column", alignItems: "center", width:250,}
  })