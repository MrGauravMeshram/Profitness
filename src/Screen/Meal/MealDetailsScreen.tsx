import { View, Text ,ImageBackground,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AddtionalExercise from '../Home/components/AdditionalExercise';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const MealDetailsScreen = () => {
  const mealData = [
  {
    id: '1',
    title: 'Tortilla Wrap',
    calories: '120 kcal',
    duration: '10 min',
    level: 'Easy',
    image: require('../../assets/Images/Tortilla.jpg'),
    backgroundColor: '#FFF4D9',
  },
  {
    id: '2',
    title: 'Salad Bowl',
    calories: '135 kcal',
    duration: '5 min',
    level: 'Beginner',
    image: require('../../assets/Images/chickensalad.jpg'),
    backgroundColor: '#E8F9F1',
  },{
    id: '3',
    title: 'Avocado Toast',
    calories: '210 kcal',
    duration: '8 min',
    level: 'Easy',
    image: require('../../assets/Images/Tortilla.jpg'),
    backgroundColor: '#FFE9E3',
  },
  {
    id: '4',
    title: 'Fruit Bowl',
    calories: '95 kcal',
    duration: '4 min',
    level: 'Beginner',
    image: require('../../assets/Images/chickensalad.jpg'),
    backgroundColor: '#F4EEFF',
  },
  {
    id: '5',
    title: 'Oats Breakfast',
    calories: '180 kcal',
    duration: '7 min',
    level: 'Medium',
    image: require('../../assets/Images/Tortilla.jpg'),
    backgroundColor: '#FFF8D6',
  },
  {
    id: '6',
    title: 'Veg Sandwich',
    calories: '165 kcal',
    duration: '12 min',
    level: 'Easy',
    image: require('../../assets/Images/chickensalad.jpg'),
    backgroundColor: '#EAFBF3',
  },
  {
    id: '7',
    title: 'Paneer Salad',
    calories: '190 kcal',
    duration: '9 min',
    level: 'Medium',
    image: require('../../assets/Images/Tortilla.jpg'),
    backgroundColor: '#FFECEC',
  },
  {
    id: '8',
    title: 'Smoothie Bowl',
    calories: '145 kcal',
    duration: '6 min',
    level: 'Easy',
    image: require('../../assets/Images/chickensalad.jpg'),
    backgroundColor: '#EEF4FF',
  },
];
  return (
    
    <ScrollView
    contentContainerStyle={{paddingBottom:50}}
    showsVerticalScrollIndicator={false}
    style={{flex:1,backgroundColor:"white"}}>
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
          <Text style={Style.fattitle}>Fat</Text>
          <Text style={Style.fatValue}>1.5 g </Text>
        </View>
        <View>
          <Text style={Style.fattitle}>Protein</Text>
          <Text style={Style.fatValue}>10.9 g</Text>
        </View>
        <View>
          <Text style={Style.fattitle}>Carbs</Text>
          <Text style={Style.fatValue}>13.5 g</Text>
        </View>
        
      </View>
      <View style={Style.FoodContainer}>
          <Text style={Style.foodText}>Healthy balanced vegetarian 
food</Text>
          </View>
          <View style={Style.FoodContainer}>
            <Text style={Style.foodDescription}>There are many variations of passages of Lorem 
Ipsum available, but the majority have suffered 
alteration in some form, by injected humour,</Text>
          </View>
          <View style={{marginTop:30,height:1,width:370,backgroundColor:'lightgrey',alignSelf:"center"}}/>
          <View>
          
            <AddtionalExercise heading='Meal' data={mealData}/>

          </View>
    </ScrollView>
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
    gap:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30

  },
  fattitle:{
    fontFamily:"Montserrat-SemiBold",
    fontSize:14,
    marginBottom:5
  },
  fatValue:{
    fontFamily:"Montserrat-SemiBold",
    fontSize:16
  },
  foodText:{
    fontFamily:"BebasNeue-Regular",
    fontSize:24,
    width:250,
    marginTop:30
  },
  FoodContainer:{
    paddingHorizontal:16
  },
  foodDescription:{
    fontFamily:"Montserrat-Regular",
    fontSize:14,
    width:350,
  }
})