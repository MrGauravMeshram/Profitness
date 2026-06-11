import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import StatsContainer from './component/StatsContainer'
import { BtnData } from './Data/btnData'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedRef,
} from 'react-native-reanimated'
import React, { useState } from 'react'
import Selector from '../../components/Selector'
import { ProgramData } from './Data/programData'
import { ExerciseCardData } from './Data/ExerciseData'
import ExerciseCard from './component/ExerciseCard'
import Buttons from '../Auth/component/AuthButton'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/StackNavigator'

type Props = {
  navigation?: any;
  route?: RouteProp<RootStackParamList, 'ExerciseDetails'>
}
type ExerciseType = 'Cardio' | 'Legs' | 'Back' | 'Chest' | 'Shoulder';

const HEADER_HEIGHT = 480;

const ExerciseDetailsScreen = ({ navigation, route }: Props) => {
  const item = route?.params?.item;
  const [selected, setSelected] = useState<ExerciseType>('Cardio');
  const [selectLevel, setSelectLevel] = useState('Beginner');

  const ScrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.5, 1],
      'clamp'
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT + 50],
      'clamp'
    );

    return {
      transform: [
        { translateY },
        { scale }
      ],
    };
  });

  const stickyHeaderAnimatedStyle = useAnimatedStyle(() => {

    const opacity = interpolate(
      scrollY.value,
      [HEADER_HEIGHT, HEADER_HEIGHT + 80],
      [0, 1],
      'clamp'
    );
    return {
      opacity,
    };
  });

  const Insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Animated.ScrollView
        ref={ScrollViewRef}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: "#FFF" }}>
          <View style={styles.stateBox}>
            {BtnData.map((Stats) => (
              <View key={Stats.id}>
                <StatsContainer
                  title={Stats.title}
                  btnTitle={Stats.subtitle}
                  onpress={() => setSelectLevel(Stats.subtitle)}
                  active={selectLevel === Stats.subtitle}
                />
              </View>
            ))}
          </View>


          <View style={styles.stickyTitle}>
            <Text style={styles.title}>Exercises with Sitting Dumbbells</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={{ width: '85%', fontFamily: 'Montserrat-Regular', fontSize: 13 }}>
              There are many variations of passages of Lorem Ipsum available, but the majority
              have suffered alteration in some form, by injected humour,
            </Text>
          </View>


          <View style={styles.week}>
            <Text style={styles.text}>3 Weeks - 20 Exercise</Text>
            <TouchableOpacity style={styles.wkbtn}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Schedule</Text>
            </TouchableOpacity>
          </View>


          <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.Program}>Exercise Program</Text>
          </View>


          <View style={styles.stickyPills}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexDirection: 'row', gap: 10, paddingVertical: 10 }}
            >
              {ProgramData.map((prog, i) => (
                <Selector
                  key={i.toString()}
                  title={prog}
                  onPress={() => setSelected(prog as ExerciseType)}
                  active={selected === prog}
                />
              ))}
            </ScrollView>
          </View>


          {ExerciseCardData[selected] && ExerciseCardData[selected].map((ex: any, index: number) => (
            <View key={ex.id || index.toString()} style={{ paddingVertical: 15, gap: 25, paddingHorizontal: 16 }}>
              <ExerciseCard
                id={ex.id}
                image={ex.image}
                title={ex.title}
                time={ex.time}
                subtitle=""
                kcal={ex.kcal}
                level={ex.level}
                onPress={() => { }}
              />
              {index !== ExerciseCardData[selected].length - 1 && (
                <View style={styles.lines} />
              )}
            </View>
          ))}
        </View>
      </Animated.ScrollView>


      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        {item && (
          <Image
            source={{ uri: item.image }}
            style={styles.detailImage}
            resizeMode="cover"
          />
        )}
        {/* Banner Box (Kcal and Time) */}
        <View style={styles.bannerBox}>
          <View style={styles.innerText}>
            <MaterialCommunityIcons
              name="fire"
              size={24}
              color="black"
            />
            <Text style={styles.subtitle}>135 kcal</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.innerText}>
            <MaterialCommunityIcons
              name="clock"
              size={24}
              color="black"
            />
            <Text style={styles.subtitle}>5 min</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.stickyHeaderBar, stickyHeaderAnimatedStyle, { paddingTop: Insets.top }]}>
        <Text style={styles.stickyHeaderTitle}>Exercises with Sitting Dumbbells</Text>
      </Animated.View>


      <TouchableOpacity
        style={[styles.backButton, { top: Insets.top + 10 }]}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" color="#000" size={30} />
      </TouchableOpacity>

      <View style={[styles.fixedBottomButtonContainer, { paddingBottom: Insets.bottom + 10 }]}>
        <Buttons title="Start Now" onPress={() => navigation.navigate('ScheduleExercise')} />
      </View>
    </View>
  )
}

export default ExerciseDetailsScreen

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    overflow: 'visible',
    zIndex: 5,
  },
  bannerBox: {
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    bottom: -20,
    alignSelf: 'center',
    gap: 35,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  stateBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 15,
    marginTop: 35,
  },
  detailImage: {
    width: '100%',
    height: "100%",
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  stickyTitle: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  stickyPills: {
    width: '100%',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 22,
  },
  Program: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 4,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  wkbtn: {
    width: 120,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  lines: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  stickyHeaderBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 110,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  stickyHeaderTitle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 22,
    color: '#000',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fixedBottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    zIndex: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
})