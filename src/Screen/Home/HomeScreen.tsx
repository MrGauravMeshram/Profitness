import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, BackHandler, Image, Dimensions, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from './components/Header';
import Banner from './components/Banner';
import SelectGoal from './components/SelectGoal';
import Toast from 'react-native-toast-message';
import Carousel from 'react-native-reanimated-carousel';
import CategoryList from './components/Category';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Popular from './components/PopularExercise';
import SearchBar from '../../components/searchBar';
import { BannerData } from './BannerImageData/ImageData';
const { width } = Dimensions.get('window');
import AdditionalExercise from './components/AdditionalExercise';

const Home = ({ navigation }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState('2');
  const [popularData, setPopularData] = useState([
  {
    id: '1',
    image: require('../../assets/png/manStr.png'),
    title: 'Full Shot Man Stretching Arm',
    level: 'Beginner',
    duration: '30 min',
    isFavorite: false,
  },
  {
    id: '2',
    image: require('../../assets/png/mandumbel.png'),
    title: 'Athlete Practicing Monochrome',
    level: 'Beginner',
    duration: '50 min',
    isFavorite: false,
  },
]);

const [mealData, setMealData] = useState([
  {
    id: '1',
    image: require('../../assets/png/salad.png'),
    title: 'Greek salad with lettuce green onion',
    level: '150 kcal',
    duration: '',
    isFavorite: false,
  },
  {
    id: '2',
    image: require('../../assets/png/saladfresh.png'),
    title: 'Salad of Fresh Vegetable',
    level: '270 kcal',
    duration: '',
    isFavorite: false,
  },
]);
  



  const scrollY = useSharedValue(0);


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for the sticky container — computed on UI thread
  const stickyAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollY.value,
      [0, 170],
      [170, 0],
      Extrapolation.CLAMP,
    );
    const height = interpolate(
      scrollY.value,
      [0, 170],
      [80, 105],
      Extrapolation.CLAMP,
    );
    const radius = interpolate(
      scrollY.value,
      [0, 170],
      [20, 0],
      Extrapolation.CLAMP,
    );

    return {
      top,
      height,
      borderRadius: radius,
    };
  });


  const goalPillsAnimatedStyle = useAnimatedStyle(() => {

    const top = interpolate(
      scrollY.value,
      [0, 465],
      [570, 105],
      Extrapolation.CLAMP,
    );

    const isStuck = scrollY.value >= 465;

    return {
      top,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isStuck ? 0.08 : 0,
      shadowRadius: isStuck ? 3 : 0,
      elevation: isStuck ? 3 : 0,
    };
  });

  const goalData = [
    { id: '1', title: 'Loose Weight' },
    { id: '2', title: 'Gain Weight' },
    { id: '3', title: 'Body Building' },
    { id: '4', title: 'Healthy' },
  ];

  const categoryData = [
    { id: '1', title: 'Yoga', image: require('../../assets/png/Yoga.png') },
    { id: '2', title: 'Gym', image: require('../../assets/png/gyms.png') },
    {
      id: '3',
      title: 'Cardio',
      image: require('../../assets/png/cardiao.png'),
    },
    {
      id: '4',
      title: 'Stretch',
      image: require('../../assets/png/stretch.png'),
    },
    {
      id: '5',
      title: 'Full Body',
      image: require('../../assets/png/fullbody.png'),
    },
  ];

  
  useFocusEffect(
    useCallback(() => {
      let backPressedOnce = false;

      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp();
          return true;
        }

        backPressedOnce = true;

        Toast.show({
          type: 'info',
          text1: 'Press back again to exit',
          position: 'bottom',
        });

        setTimeout(() => {
          backPressedOnce = false;
        }, 1500);

        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => subscription.remove();
    }, []),
  );
const handleExerciseFavorite = (item) => {
  setPopularData(prev =>
    prev.map(ex =>
      ex.id === item.id
        ? { ...ex, isFavorite: !ex.isFavorite }
        : ex,
    ),
  );
};

const handleMealFavorite = (item) => {
  setMealData(prev =>
    prev.map(meal =>
      meal.id === item.id
        ? { ...meal, isFavorite: !meal.isFavorite }
        : meal,
    ),
  );
};
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        overScrollMode="never"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View>
          <View style={styles.con}>
            <Header />
          </View>
          <View>
            <Carousel
              loop
              width={width}
              height={250}
              autoPlay
              scrollAnimationDuration={1000}
              data={BannerData}
              onConfigurePanGesture={gesture => {
                gesture.activeOffsetX([-10, 10]);
                gesture.failOffsetY([-5, 5]);
              }}
              onProgressChange={(_, absoluteProgress) => {
                const index = Math.round(absoluteProgress) % BannerData.length;
                setActiveIndex(index);
              }}
              renderItem={({ item }) => (
                <View style={styles.ImageBox}>
                  <Image
                    source={item.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              {BannerData.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: activeIndex === index ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      activeIndex === index ? '#B7CF1A' : '#D3D3D3',
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </View>
        </View>
        <View />

        <View
          style={{ paddingHorizontal: 20, backgroundColor: '#FFF', paddingTop: 16 }}
        >
          <Text style={styles.heading}>Select your Goal</Text>
        </View>


        <View style={{ height: 75, backgroundColor: '#FFF' }} />

        <CategoryList data={categoryData} />
        <View style={styles.line} />
        <Popular heading="POPULAR EXERCISE" data={popularData}  onPressFavorite={handleExerciseFavorite} />
        <View style={[styles.line, { width: 380 }]} />
        <Popular heading="MEAL PLANS" data={mealData}   onPressFavorite={handleMealFavorite}/>
        <View style={[styles.line, { width: 380, marginBottom: 10 }]} />
        <AdditionalExercise
          heading="ADDITIONAL EXERCISE"
          data={[
            {
              id: '1',
              title: 'Exercises with Jumping\nRope',
              calories: '110 kcal',
              duration: '10 min',
              level: 'Beginner',
              backgroundColor: '#FFC107',
              image: require('../../assets/png/jump1.png'),
            },
            {
              id: '2',
              title: 'Exercises with Holding Jumping\nRope',
              calories: '135 kcal',
              duration: '8 min',
              level: 'Beginner',
              backgroundColor: '#33C3D9',
              image: require('../../assets/png/jump2.png'),
            },
            {
              id: '3',
              title: 'Exercises with Sitting\nDumbbells',
              calories: '135 kcal',
              duration: '5 min',
              level: 'Beginner',
              backgroundColor: '#FF7F5C',
              image: require('../../assets/png/jump3.png'),
            },
          ]}
        />
      </Animated.ScrollView>


      <Animated.View
        style={[
          styles.goalStickyContainer,
          goalPillsAnimatedStyle,
        ]}
      >
        <SelectGoal
          data={goalData}
          selectedId={selectedGoal}
          onSelect={setSelectedGoal}
        />
      </Animated.View>


      <Animated.View
        style={[
          styles.stickyContainer,
          {
            backgroundColor: '#B7CF1A',
            width: '100%',
            overflow: 'hidden',
          },
          stickyAnimatedStyle,
        ]}
      >
        <SearchBar disablekeyboard />
      </Animated.View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  con: {
    height: 260,
    backgroundColor: '#B7CF1A',
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    paddingHorizontal: 20,
    paddingTop: 55,
    overflow: 'hidden',
  },

  stickyContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  ImageBox: {
    height: 230,
    width: width - 40,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
  },

  goalStickyContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingLeft: 16,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 90,
  },

  line: {
    marginVertical: 32,
    height: 2,
    width: 350,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 21,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },
});
