import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useState,useEffect ,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/ScreensHeader';
import { WeekData } from '../../Data/WeekData';
import {Months} from './Data/MonthData'
import { Food } from './Data/Data';
import {useFocusEffect} from '@react-navigation/native';
import PopularExercise from '../Home/components/PopularExercise';
import { FoodData } from './Data/FoodData';
import Selector from '../../components/Selector';
import WeekCard from '../Exercise/component/WeekCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Skeleton } from '@rneui/base';
const MealPlanScreen = ({ navigation }: any) => {
 const [monthIndex, setMonthIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [isChoose, setChoose] = useState(0);

  const [loader,setloader]= useState(true);
const [itemdata, setItemdata] = useState<any[]>([]);


  useEffect(()=>{
        setloader(true)
        let timer = setTimeout(()=>{

         setItemdata(FoodData)
          setloader(false)
       
        },500)
        
        
        return ()=>clearTimeout(timer)
        },[FoodData])
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

   

   
    // const handlePrev = ()=>{
    //   setCurrentMonth(Months[])
    // }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => subscription.remove();
  }, []),
);
useEffect(() => {
  setloader(true);

  const timer = setTimeout(() => {
    setItemdata(
      FoodData.map(item => ({
        ...item,
        isFavorite: false,
      })),
    );
    setloader(false);
  }, 500);

  return () => clearTimeout(timer);
}, []);
 const handleNext = () => {
  setMonthIndex((prev) => (prev + 1) % Months.length);
};
const handlePrev = () => {
  setMonthIndex((prev) =>
    prev === 0 ? Months.length - 1 : prev - 1
  );
};
  const renderWeekData = ({ item, index }: any) => (
    <Pressable onPress={() => setSelected(index)}>
      <WeekCard days={item.day} date={item.date} active={selected === index} />
    </Pressable>
  );
   const handleFavorite = (item: any) => {
  setItemdata(prev =>
    prev.map(food =>
      food.id === item.id
        ? { ...food, isFavorite: !food.isFavorite }
        : food,
    ),
  );
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingBottom: 15 }}>
        <Header
          title="MEAL PLAN"
          name="funnel"
          onFilterPress={() => {}}
          navigation={navigation}
          icon={null}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={Styles.dateContainer}>
          <TouchableOpacity onPress={handlePrev} >
          <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={Styles.dateText}>
  {Months[monthIndex]}
</Text>
            <Text style={Styles.year}>2026</Text>
          </View>
          <TouchableOpacity onPress={handleNext}>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="black"/>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={WeekData}
            renderItem={renderWeekData}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={Styles.week}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25, gap: 15 }}>
          {(Food || []).map((title, idx) => (
            <Selector
              key={idx}
              title={title}
              active={isChoose === idx}
              onPress={() => setChoose(idx)}
            />
          ))}
        </View>
        <View style={Styles.mealText}>
          <Text style={Styles.text}>15 meals</Text>
        </View>
      <PopularExercise
  data={itemdata.map(item => ({
    id: item.id.toString(),
    image: item.image,
    title: item.title,
    level: item.kcal,
    duration: item.time,
    isFavorite: item.isFavorite,
  }))}
  onPressItem={(item: any) =>
    navigation.push('MealDetails', { item })
  }
  onPressFavorite={handleFavorite}
  loader={loader}
/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealPlanScreen;

const Styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  dateText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign:"center",
    minWidth:90
  },
  year: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  week: {
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 25,
  },
  mealText: {
    paddingHorizontal: 16,
    marginBottom: -20,
    marginTop: 10,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
});