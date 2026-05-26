import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ArrowComponent = () => {
  return (
  <>
      <SimpleLineIcons name="arrow-left" color="#000" size={20} />
</>
  )
}

export default ArrowComponent
const styles = StyleSheet.create({
    Container:{
        height:40,
        width:40,
        borderRadius:20,
        backgroundColor:"transparent",
        zIndex:1,
    }
})