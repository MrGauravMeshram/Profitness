import {View, Text, ScrollView, StyleSheet, Image,ImageBackground} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import AddtionalExercise from '../Home/components/AdditionalExercise';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/StackNavigator';

type Props = {
  route: RouteProp<RootStackParamList, 'MealDetails'>;
};
const MealDetailsScreen = ({route}: Props) => {
  const {item} = route.params;
  

  const mealData = [
    {id: '1', title: 'Tortilla Wrap', calories: '120 kcal', duration: '10 min', level: 'Easy', image: require('../../assets/Images/Tortilla.jpg'), backgroundColor: '#FFF4D9'},
    {id: '2', title: 'Salad Bowl', calories: '135 kcal', duration: '5 min', level: 'Beginner', image: require('../../assets/Images/chickensalad.jpg'), backgroundColor: '#E8F9F1'},
    {id: '3', title: 'Avocado Toast', calories: '210 kcal', duration: '8 min', level: 'Easy', image: require('../../assets/Images/Tortilla.jpg'), backgroundColor: '#FFE9E3'},
    {id: '4', title: 'Fruit Bowl', calories: '95 kcal', duration: '4 min', level: 'Beginner', image: require('../../assets/Images/chickensalad.jpg'), backgroundColor: '#F4EEFF'},
    {id: '5', title: 'Oats Breakfast', calories: '180 kcal', duration: '7 min', level: 'Medium', image: require('../../assets/Images/Tortilla.jpg'), backgroundColor: '#FFF8D6'},
    {id: '6', title: 'Veg Sandwich', calories: '165 kcal', duration: '12 min', level: 'Easy', image: require('../../assets/Images/chickensalad.jpg'), backgroundColor: '#EAFBF3'},
    {id: '7', title: 'Paneer Salad', calories: '190 kcal', duration: '9 min', level: 'Medium', image: require('../../assets/Images/Tortilla.jpg'), backgroundColor: '#FFECEC'},
    {id: '8', title: 'Smoothie Bowl', calories: '145 kcal', duration: '6 min', level: 'Easy', image: require('../../assets/Images/chickensalad.jpg'), backgroundColor: '#EEF4FF'},
  ];
 
  return (

    <View style={styles.root}>

        <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
   <View style={styles.heroContainer}>
 <Animated.Image
  source={item.image}
  sharedTransitionTag={`meal-${item.id}`}
  style={styles.heroImage}
/>

  <Animated.View
    entering={FadeIn.delay(150).duration(500)}
    style={styles.bannerBox}>
    <View style={styles.innerText}>
      <SimpleLineIcons name="fire" color="#000" size={24} />
      <Text style={styles.subtitle}>135 kcal</Text>
    </View>

    <View style={styles.line} />

    <View style={styles.innerText}>
      <Feather name="clock" color="#000" size={24} />
      <Text style={styles.subtitle}>5 min</Text>
    </View>
  </Animated.View>
</View>
    

      

        <Animated.View
          entering={FadeIn.delay(250).duration(500)}
          style={styles.fatContainer}>
          <View style={styles.fatItem}>
            <Text style={styles.fattitle}>Fat</Text>
            <Text style={styles.fatValue}>1.5 g</Text>
          </View>
          <View style={styles.fatItem}>
            <Text style={styles.fattitle}>Protein</Text>
            <Text style={styles.fatValue}>10.9 g</Text>
          </View>
          <View style={styles.fatItem}>
            <Text style={styles.fattitle}>Carbs</Text>
            <Text style={styles.fatValue}>13.5 g</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(350).duration(500)}
          style={styles.foodContainer}>
          <Text style={styles.foodText}>Healthy balanced vegetarian food</Text>
          <Text style={styles.foodDescription}>
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered alteration in some form, by
            injected humour,
          </Text>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeIn.delay(450).duration(500)}>
          <AddtionalExercise heading="Meal" data={mealData} />
        </Animated.View>

      </ScrollView>
    </View>
  );
};

export default MealDetailsScreen;
MealDetailsScreen.sharedElements = (route: any) => {
  const {item} = route.params;

  return [`meal.${item.id}.photo`];
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  heroContainer: {
    width: '100%',
    height: 400,


  },
  bannerBox: {
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 16,
    gap: 35,
    position: 'absolute',
    bottom: -30,

    width: '90%',
    borderRadius: 15,
 
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
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
  fatContainer: {
    flexDirection: 'row',
    gap: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  fatItem: {
    alignItems: 'center',
  },
  fattitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 5,
  },
  fatValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  foodContainer: {
    paddingHorizontal: 16,
  },
  foodText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 8,
  },
  foodDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  divider: {
    marginTop: 30,
    height: 1,
    width: 370,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
  },
  heroImage: {
  width: '100%',
  height: '100%',
},
});