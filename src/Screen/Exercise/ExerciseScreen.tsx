import { View, StyleSheet, FlatList, ScrollView, BackHandler, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/ScreensHeader';
import Selector from '../../components/Selector';
import ExerciseCard from './component/ExerciseCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoFilter from '../../components/noFilter';
import { ExerciseCardData } from './Data/ExerciseData'
import { useSelector, useDispatch } from 'react-redux';
import { setExercise } from '../../Storage/Redux/filterSlice';
const Exercise = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const selectedTime = useSelector(
    (state: any) => state.filter.Time
  );
  const ExerciseFilter = useSelector(
    (state: any) => state.filter.Exercise
  );
  const selectedLevel = useSelector(
    (state: any) => state.filter.Level
  );

  const [selected, setSelected] = useState<any>('Cardio')
  const [exerciselist, setExerciselist] = useState(ExerciseCardData[selected as keyof typeof ExerciseCardData] || []);

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setLoader(true);

    const timer = setTimeout(() => {
      let data = ExerciseCardData[selected as keyof typeof ExerciseCardData] || [];

      if (selectedTime && selectedTime !== 'All') {
        data = data.filter((item: any) => {
          const minutes = parseInt(item.time);

          switch (selectedTime) {
            case '10-15 Min':
              return minutes >= 10 && minutes <= 15;

            case '15-30 Min':
              return minutes >= 15 && minutes <= 30;

            case '30-45 Min':
              return minutes >= 30 && minutes <= 45;

            default:
              return true;
          }
        });
      }

      if (selectedLevel && selectedLevel !== 'All') {
        data = data.filter((item: any) => item.level.toLowerCase() === selectedLevel.toLowerCase());
      }

      setExerciselist(data);
      setLoader(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selected, selectedTime, selectedLevel]);


  useEffect(() => {
    if (
      ExerciseFilter &&
      ExerciseFilter !== 'All'
    ) {
      setSelected(ExerciseFilter);
    } else {
      setSelected('Cardio');
    }
  }, [ExerciseFilter]);

  const handleSelectExercise = (item: any) => {
    setSelected(item);
    dispatch(setExercise(item));
  };
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
          visibilityTime: 1500,
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
      return () => {
        subscription.remove();
      };
    }, [])
  );

  const ExerciseData = [
    'Cardio',
    'Legs',
    'Back',
    'Chest',
    'Shoulder',
    'Biceps',
    'Triceps'
  ]

  const renderItem = ({ item }: any) => {
    return (
      <>

        <Selector title={item} active={selected === item} onPress={() => handleSelectExercise(item)} />

      </>
    )
  }
  const renderData = ({ item, index }: any) => {
    return (
      <>
        <View style={{ paddingVertical: 25 }}>
          <ExerciseCard id={item.id} title={item.title} kcal={item.kcal} time={item.time} level={item.level} image={item.image} subtitle='' onPress={() => navigation.navigate('ExerciseDetails', { item })} loader={loader} />
        </View>
        {index !== exerciselist.length - 1 && (
          <View style={style.line} />
        )}

      </>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: 100 }}

        overScrollMode='never'>
        <Header title='FULL EXERCISE' name='funnel-outline' navigation={navigation} icon={null} onFilterPress={() => navigation.navigate('Filter')} />

        <View style={style.SelectorView}>



          <FlatList
            data={ExerciseData}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}

            nestedScrollEnabled
            contentContainerStyle={style.list} />

        </View>

        {
          exerciselist.length > 0 ? (
            <FlatList
              data={exerciselist}
              renderItem={renderData}
              scrollEnabled={false}
              nestedScrollEnabled
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={style.cardlist}
            />
          ) : (
            <>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <NoFilter
                  title="No Exercise Found"
                  subtitle="Try changing your filters"
                />
              </View>
            </>
          )
        }


      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercise;

const style = StyleSheet.create({
  SelectorView: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    marginTop: 25,
    paddingHorizontal: 16
  },
  list: {
    gap: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingTop: 15,
    borderBottomColor: 'lightgrey'

  },
  cardlist: {
    paddingHorizontal: 16,
    paddingBottom: 120,


  },
  line: {
    height: 1,
    width: 400,
    backgroundColor: "lightgrey",
  }
})