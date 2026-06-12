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

const displayCategoriesData = categoriesData.map(item => item === 'Stretching' ? 'Streching' : item);

const FilterScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state: any) => state.filter);

  const [selectedCategory, setSelectedCategory] = useState(
    filterState.Categories === 'Stretching' ? 'Streching' : filterState.Categories || ''
  );

  const [selectedExercise, setSelectedExercise] = useState(filterState.Exercise || '');

  const [selectedLevel, setSelectedLevel] = useState(filterState.Level || '');

  const [selectedMeal, setSelectedMeal] = useState(filterState.Meal || '');

  const [selectedTime, setSelectedTime] = useState(filterState.Time || '');

  const renderCategory = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedCategory === item || (item === 'All' && !selectedCategory)}
      onPress={() => setSelectedCategory(item === 'All' ? '' : item)}
      containerStyle={styles.selectorContainer}
      style={styles.selectorBtn}
    />
  );

  const renderExercise = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedExercise === item || (item === 'All' && !selectedExercise)}
      onPress={() => setSelectedExercise(item === 'All' ? '' : item)}
      containerStyle={styles.selectorContainer}
      style={styles.selectorBtn}
    />
  );

  const renderLevel = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedLevel === item}
      onPress={() => setSelectedLevel(item)}
      containerStyle={styles.selectorContainer}
      style={styles.selectorBtn}
    />
  );

  const renderMeal = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedMeal === item}
      onPress={() => setSelectedMeal(item)}
      containerStyle={styles.selectorContainer}
      style={styles.selectorBtn}
    />
  );

  const renderTime = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedTime === item}
      onPress={() => setSelectedTime(item)}
      containerStyle={styles.selectorContainer}
      style={styles.selectorBtn}
    />
  );

  const applyFilters = () => {
    const categoryToSave = selectedCategory === 'Streching' ? 'Stretching' : selectedCategory;
    const levelToSave = selectedLevel;

    dispatch(setCategories(categoryToSave));
    dispatch(setExercise(selectedExercise));
    dispatch(setLevel(levelToSave));
    dispatch(setMeal(selectedMeal));
    dispatch(setTime(selectedTime));
    navigation.goBack();
  };

  const handleClearAll = () => {
    dispatch(resetFilters());
    setSelectedCategory('');
    setSelectedExercise('');
    setSelectedLevel('');
    setSelectedMeal('');
    setSelectedTime('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="FILTERS PLAN"
        navigation={navigation}
        rightText="Clear All"
        onFilterPress={handleClearAll}
        rightTextStyle={styles.headerRightText}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.heading}>CATEGORIES</Text>

        <FlatList
          scrollEnabled={false}
          data={displayCategoriesData}
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
      </ScrollView>
      <View style={styles.buttonBox}>
        <AuthButton title="APPLY FILTERS" onPress={applyFilters} />
      </View>

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
    paddingTop: 15,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 16,
    color: '#3A3A3A',
    marginBottom: 16,
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  selectorContainer: {
    width: '31.5%',
    marginBottom: 14,
  },

  selectorBtn: {
    width: '100%',
    paddingHorizontal: 0,
  },

  buttonBox: {
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  headerRightText: {
    color: '#3A3A3A',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});
