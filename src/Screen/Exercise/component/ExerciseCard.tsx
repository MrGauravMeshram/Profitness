import { View, Text,Image,StyleSheet ,TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { Skeleton } from '@rneui/themed'
import  Animated from 'react-native-reanimated'


type PropsCard={
    title:string,
    subtitle:string,
    kcal:string,
    id:number
    time:string,
    level:string,
    image:any
    loader?:boolean
    onPress:()=>void
}
const ExerciseCard = ({id,title,subtitle,kcal,time,level,image,onPress,loader}:PropsCard) => {
  
  
  return (
 <TouchableOpacity onPress={onPress}>
    <View style={style.container}>
      {loader?(<Skeleton style={style.ImageContainer}/>):(
      <View style={style.ImageContainer}>
       <Animated.Image  
       sharedTransitionTag={`Exercise-${id}`}
          source={{uri:image}}
          style={style.image}
       />
      </View>)}
      <View style={{paddingHorizontal:16,gap:10,paddingVertical:10}}>
      
        <Text style={style.title}>{title}</Text>
<View style={[style.container,{alignItems:"center",gap:5}]}>
  <MaterialCommunityIcons
  name="fire"
  size={24}
  color="black"
/>
<Text style={style.subTitle}>{kcal}</Text>
<View style={{height:20,width:1,backgroundColor:"black"}}/>
<MaterialCommunityIcons
name='clock'
size={24}
color='black'/>
<Text style={style.subTitle}>{time}</Text>
</View>
<Text style={style.subTitle}>{level}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default ExerciseCard
const style = StyleSheet.create({
    container:{
 flexDirection:"row",
 
    },
    cardView:{
        height:120,
        width:600,
    },
    ImageContainer:{
           height:120,
           width:120,

    },
    image:{
         height:"100%",
         width:"100%"
    },
    title:{
        fontFamily:"Montserrat-SemiBold",
        fontSize:14,
        width:250
    },
    subTitle:{
        fontFamily:"Montserrat-Medium",
        fontSize:12
    }
})