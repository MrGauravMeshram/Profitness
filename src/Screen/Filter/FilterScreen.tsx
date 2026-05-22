import React, { useState } from 'react';

import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Selector from '../../components/Selector';
import Header from '../../components/ScreensHeader';
import AuthButton from '../../Screen/Auth/component/AuthButton';

import {
  categoriesData,
  exerciseData,
  levelData,
  mealData,
  timeData,
} from '../../Data/FilterData';

const FilterScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('Running');

  const [selectedExercise, setSelectedExercise] = useState('All');

  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const [selectedMeal, setSelectedMeal] = useState('Breakfast');

  const [selectedTime, setSelectedTime] = useState('15-30 Min');

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

  // Meal Render

  const renderMeal = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedMeal === item}
      onPress={() => setSelectedMeal(item)}
    />
  );

  // Time Render

  const renderTime = ({ item }: any) => (
    <Selector
      title={item}
      active={selectedTime === item}
      onPress={() => setSelectedTime(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Clear All" title="FILTERS PLAN" navigation={navigation} />

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

        {/* Exercise */}

        <Text style={styles.heading}>EXERCISE</Text>

        <FlatList
          scrollEnabled={false}
          data={exerciseData}
          renderItem={renderExercise}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />

        {/* Level */}

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
          <AuthButton title="APPLY FILTERS" />
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

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem: {
    width: '31%',
    marginBottom: 12,
  },

  buttonBox: {
    marginTop: 25,
    marginBottom: 20,
  },
});
