import React, { useState } from 'react';

import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Selector from '../../components/Selector';
import Header from '../../components/ScreensHeader';
import AuthButton from '../../Screen/Auth/component/AuthButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories,
  setExercise,
  setLevel,
  setMeal,
  setTime,
  resetFilters,
} from '../../Storage/Redux/filterSlice';

import {
  categoriesData,
  exerciseData,
  levelData,
  mealData,
  timeData,
} from '../../Data/FilterData';

const FilterScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state: any) => state.filter);

  const [selectedCategory, setSelectedCategory] = useState(filterState.Categories || 'All');

  const [selectedExercise, setSelectedExercise] = useState(filterState.Exercise || 'All');

  const [selectedLevel, setSelectedLevel] = useState(filterState.Level || 'Beginner');

  const [selectedMeal, setSelectedMeal] = useState(filterState.Meal || 'Breakfast');

  const [selectedTime, setSelectedTime] = useState(filterState.Time || '15-30 Min');

  const renderCategory = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedCategory === item}
      onPress={() => setSelectedCategory(item)}
    />
  );

  const renderExercise = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedExercise === item}
      onPress={() => setSelectedExercise(item)}
    />
  );

  const renderLevel = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedLevel === item}
      onPress={() => setSelectedLevel(item)}
    />
  );



  const renderMeal = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedMeal === item}
      onPress={() => setSelectedMeal(item)}
    />
  );

  

  const renderTime = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedTime === item}
      onPress={() => setSelectedTime(item)}
    />
  );
  const applyFilters = () => {
        dispatch(setCategories(selectedCategory));
        dispatch(setExercise(selectedExercise));
        dispatch(setLevel(selectedLevel));
        dispatch(setMeal(selectedMeal));
        dispatch(setTime(selectedTime));
        navigation.goBack();
    
  }

  const handleClearAll = () => {
    dispatch(resetFilters());
    setSelectedCategory('All');
    setSelectedExercise('All');
    setSelectedLevel('Beginner');
    setSelectedMeal('Breakfast');
    setSelectedTime('15-30 Min');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="FILTERS PLAN"
        navigation={navigation}
        rightText="Clear All"
        onFilterPress={handleClearAll}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.heading}>CATEGORIES</Text>

        <FlatList
          scrollEnabled={false}
          data={categoriesData}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />



        <Text style={styles.heading}>EXERCISE</Text>

        <FlatList
          scrollEnabled={false}
          data={exerciseData}
          renderItem={renderExercise}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />

        

        <Text style={styles.heading}>LEVEL</Text>

        <FlatList
          scrollEnabled={false}
          data={levelData}
          renderItem={renderLevel}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />

        <Text style={styles.heading}>MEAL</Text>

        <FlatList
          scrollEnabled={false}
          data={mealData}
          renderItem={renderMeal}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />

        <Text style={styles.heading}>TIME</Text>

        <FlatList
          scrollEnabled={false}
          data={timeData}
          renderItem={renderTime}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />

        <View style={styles.buttonBox}>
          <AuthButton title="APPLY FILTERS" onPress={applyFilters}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 21,
    color: '#3A3A3A',

    marginBottom: 18,
    marginTop: 14,

    fontFamily: 'BebasNeue-Regular',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonBox: {
    marginTop: 25,
    marginBottom: 20,
  },
});
