import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, {FadeIn, SharedTransition,} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RouteProp} from '@react-navigation/native';

import AddtionalExercise from '../Home/components/AdditionalExercise';
import {RootStackParamList} from '../../Navigation/StackNavigator';
type ExerciseType = 'Cardio' | 'Legs' | 'Back' | 'Chest';
type Props = {
  route: RouteProp<RootStackParamList, 'MealDetails'>;
};

const MealDetailsScreen = ({route}: Props) => {
  const {item} = route.params;

  const mealData = [
    {
      id: '1',
      title: 'Tortilla Wrap',
      calories: '120 kcal',
      duration: '10 min',
      level: 'Easy',
      image: require('../../assets/Images/Tortilla.jpg'),
    },
    {
      id: '2',
      title: 'Salad Bowl',
      calories: '135 kcal',
      duration: '5 min',
      level: 'Beginner',
      image: require('../../assets/Images/chickensalad.jpg'),
    },
  ];
console.log('detail item', item.id);
const transition = SharedTransition
  .springify()
  .damping(18)
  .stiffness(140);
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>

        
        <View style={styles.heroContainer}>
         <Animated.Image
  source={item.image}
  sharedTransitionTag={`meal-${item.id}`}
  sharedTransitionStyle={transition}
  style={styles.heroImage}
  resizeMode="cover"
/>

          <Animated.View
            entering={FadeIn.delay(150).duration(500)}
            style={styles.bannerBox}>
            <View style={styles.innerText}>
              <SimpleLineIcons name="fire" size={22} color="#000" />
              <Text style={styles.subtitle}>135 kcal</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.innerText}>
              <Feather name="clock" size={22} color="#000" />
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
          <Text style={styles.foodText}>
            Healthy balanced vegetarian food
          </Text>

          <Text style={styles.foodDescription}>
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered alteration in some form.
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  heroContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
  },
heroImage: {
  width: '100%',
  height: 380,
   borderRadius: 18,
},

  bannerBox: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
   
  },

  innerText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },

  line: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
  },

  fatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  fatItem: {
    alignItems: 'center',
  },

  fattitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },

  fatValue: {
    fontSize: 16,
    marginTop: 6,
    fontFamily: 'Montserrat-Bold',
  },

  foodContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
  },

  foodText: {
    fontSize: 24,
    fontFamily: 'BebasNeue-Regular',
    marginBottom: 8,
  },

  foodDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 24,
    marginHorizontal: 20,
  },
});