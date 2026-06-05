import { View, Text,StyleSheet } from 'react-native'
import React from 'react'


type Props={
    days:string,
    date:string,
    active?:boolean
}

const WeekCard = ({days,date,active}:Props) => {
  return (
    <View style={[Style.container,{
        backgroundColor:active? "#000":"#F2F2F2"
    }]}>
      <Text style={[Style.title,{color:active? "white":"black"}]}>{days}</Text>
      <View style={Style.dateContainer}>
        <Text style={Style.text}>{date}</Text>
      </View>
    </View>
  )
}

export default React.memo(WeekCard);
const Style = StyleSheet.create({
    container:{
        height:120,
        width:80,
        justifyContent:"center",
        gap:10,
         overflow: 'hidden', 
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'#F2F2F2'
    },
    dateContainer:{
          backgroundColor:"white",
          borderRadius:50,
          alignItems:"center",
          justifyContent:"center",
          height:50,
          width:50,
    },
    text:{
        fontFamily:"Montserrat-Bold",
        fontSize:16
    },
    title:{
        fontFamily:"Montserrat-Regular",
        fontSize:16,
    }
})