import React, { useState, useRef,useEffect  ,useCallback,} from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity ,BackHandler,Image,FlatList,Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from './components/Header';
import Banner from './components/Banner';
import SelectGoal from './components/SelectGoal';
import Toast from 'react-native-toast-message';
import Carousel from 'react-native-reanimated-carousel';
import CategoryList from './components/Category';
import Animateds from 'react-native-reanimated';
import Popular from './components/PopularExercise';
import SearchBar from '../../components/searchBar';
import {BannerData} from './BannerImageData/ImageData';
 const {width} = Dimensions.get('window');
import AdditionalExercise from './components/AdditionalExercise';
const Home = ({navigation}:any) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  const [selectedGoal, setSelectedGoal] = useState('2');
  const scrollY = useRef(new Animated.Value(0)).current;
const [isSticky, setIsSticky] = useState(false);
  const searchBackground = '#B7CF1A';

  const searchTop = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: [170, 0],
    extrapolate: 'clamp',
  });

  const searchHeight = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: [80, 105],
    extrapolate: 'clamp',
  });

  const borderRadius = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  const searchWidth = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: ['100%', '100%'],
    extrapolate: 'clamp',
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

  const popularData = [
    {
      id: '1',
      image: require('../../assets/png/manStr.png'),
      title: 'Full Shot Man Stretching Arm',
      level: 'Beginner',
      duration: '30 min',
    },
    {
      id: '2',
      image: require('../../assets/png/mandumbel.png'),
      title: 'Athlete Practicing Monochrome',
      level: 'Beginner',
      duration: '50 min',
    },
  ];
  const mealData = [
    {
      id: '1',
      image: require('../../assets/png/salad.png'),
      title: 'Greek salad with lettuce green onion',
      level: '150 kcal',
      duration: '',
    },
    {
      id: '2',
      image: require('../../assets/png/saladfresh.png'),
      title: 'Salad of Fresh Vegetable',
      level: '270 kcal',
      duration: '',
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

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        stickyHeaderIndices={[3]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
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
    <Animated.View style={styles.ImageBox}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
        resizeMode="contain"
      />
    </Animated.View>
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
          // style={{
          //   position: 'absolute',
          //   top: 480,
          //   left: 20,
          //   zIndex: 9999,
          //   backgroundColor: '#FFF',
          //   paddingRight: 10,
          
          // }}
          style={{paddingHorizontal: 20,backgroundColor: '#FFF',paddingTop: 16}}
        >
          <Text style={styles.heading}>Select your Goal</Text>
        </View>
        <View style={styles.goalContainer}>
          <SelectGoal
            data={goalData}
            selectedId={selectedGoal}
            onSelect={setSelectedGoal}
          />
        </View>

        <CategoryList data={categoryData} />
        <View style={styles.line} />
        <Popular heading="POPULAR EXERCISE" data={popularData} />
        <View style={[styles.line, { width: 380 }]} />
        <Popular heading="MEAL PLANS" data={mealData} />
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
          styles.stickyContainer,
          {
            backgroundColor: searchBackground,
            width: searchWidth,
            height: searchHeight,
            top: searchTop,
            borderRadius: borderRadius,
            overflow: 'hidden',
          },
        ]}
      >
        
        <SearchBar disablekeyboard/>

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

  goalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 16,
   paddingBottom: 20,
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
