import { View, Text,StyleSheet } from 'react-native'
import Selector from '../../../components/Selector'
import React from 'react'

type Props={
    title:string,
    btnTitle:string
}

const StatsContainer = ({title,btnTitle}:Props) => {
  return (
    <View>
      <View style={style.box}>
        <Text style={style.text}>{title}</Text>
       <Selector title={btnTitle}/>
      </View>
    </View>
  )
}

export default StatsContainer
const style= StyleSheet.create({
    text:{
        textAlign:"center",
        fontFamily:"Montserrat-Medium",
        fontSize:13,
    },
    box:{
        gap:10
    }
})