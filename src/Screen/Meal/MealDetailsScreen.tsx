import { View, Text ,ImageBackground,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const MealDetailsScreen = () => {
  return (
    
    <View>
      <View style={Style.imageContainer}>
      <ImageBackground
      source={require('../../assets/Images/chickensalad.jpg')
      }
      resizeMode='cover'
      style={{height:"100%", width:"100%"}}>
       
      </ImageBackground>
       <View style={Style.bannerBox}>
          <View style={Style.innerText}>
      <SimpleLineIcons name="fire" color="#000" size={24} />
            <Text style={Style.subtitle}>135kcl</Text>
          </View>
          <View style={Style.line} />
          <View style={Style.innerText}>
        <Feather name="clock" color="#000" size={24} />
            <Text style={Style.subtitle}>5 min</Text>
          </View>
        </View>
      </View>
      <View style={Style.fatContainer}>
        <View>
          <Text>Fat</Text>
          <Text>1.5 g </Text>
        </View>
        <View>
          <Text>Protein</Text>
          <Text>10.9 g</Text>
        </View>
        <View>
          <Text>Carbs</Text>
          <Text>13.5 g</Text>
        </View>
      </View>
    </View>
  )
}

export default MealDetailsScreen
const Style = StyleSheet.create({
  imageContainer:{
    height:400,
    width:"100%"
  },
  boxContainer:{

  },
   bannerBox: {
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    bottom: -20,
    left: 20,
    gap: 35,
    borderRadius: 15,
  },
  line: {
    height: 25,
    width: 1,
    backgroundColor: 'black',
  },
  innerText: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  fatContainer:{
    flexDirection:"row",
    gap:20

  }
})