import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/ScreensHeader';

import Level from '../SteppingScreen/component/Level';

import AuthButton from '../Auth/component/AuthButton';

const NewWorkout = ({
  navigation,
}: any) => {

  const [workoutName, setWorkoutName] =
    useState('');

  const [selectedLevel, setSelectedLevel] =
    useState('Beginner');

  const levels = [
    {
      title: 'Beginner',
    },

    {
      title: 'Intermediate',
    },

    {
      title: 'Advanced',
    },
  ];

  return (
    <SafeAreaView
      style={styles.container}>

    
<View style={styles.ViewHeader}>
      <Header
        title="NEW WORKOUT"
        navigation={navigation}

      />
      </View>

      <View style={styles.content}>

      

        <Text style={styles.heading}>
          Workout Name
        </Text>

        <TextInput
          value={workoutName}
          onChangeText={setWorkoutName}
          placeholder="Workout name"
          placeholderTextColor="#6B7280"
          style={styles.input}
        />

      

        <Text style={styles.levelHeading}>
          Choose Fitness Level
        </Text>

        <Level
          selectedLevel={
            selectedLevel
          }
          onSelect={setSelectedLevel}
          levels={levels}
        />

  

        <Text style={[styles.heading,{marginTop:20}]}>
          Workout
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.exerciseBtn}>
          
          <Ionicons
            name="add"
            size={24}
            color="#FFF"
          />

          <Text
            style={
              styles.exerciseText
            }>
            Add Exercises
          </Text>

        </TouchableOpacity>

        

        <View style={styles.timeRow}>

          <Text style={styles.heading}>
            Time
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.timeBox}>
            
            <Text
              style={styles.timeText}>
              05:44 AM
            </Text>

            <Ionicons
              name="chevron-down"
              size={18}
              color="#111"
            />

          </TouchableOpacity>

        </View>

      

        <View style={styles.buttonBox}>
          
          <AuthButton title="CREATE WORKOUT" />

        </View>

      </View>

    </SafeAreaView>
  );
};

export default NewWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
   marginBottom:20,
    paddingTop: 25,
  },
  ViewHeader:{
    marginBottom:25,
  }
,
  heading: {
    fontSize: 21,

    color: '#111',

    marginBottom: 14,

    fontFamily:
      'Montserrat-Bold',
  },

  levelHeading: {
    fontSize: 21,

    color: '#111',

    marginTop: 30,
    marginBottom: 18,

    fontFamily:
      'Montserrat-Bold',
  },

  input: {
    width: '100%',
    height: 58,

    borderWidth: 1,
    borderColor: '#D9D9D9',

    borderRadius: 8,

    paddingHorizontal: 18,

    backgroundColor: '#FFF',

    fontSize: 15,

    fontFamily:
      'DMSans_18pt-Regular',
  },

  exerciseBtn: {
    width: '100%',
    height: 58,

    borderRadius: 6,

    backgroundColor: '#000',

    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  exerciseText: {
    fontSize: 18,

    color: '#FFF',

    marginLeft: 10,

    fontFamily:
      'Montserrat-Medium',
  },

  timeRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginTop: 26,
  },

  timeBox: {
    width: 125,
    height: 42,

    borderRadius: 6,

    backgroundColor: '#EFEFEF',

    flexDirection: 'row',

    justifyContent:
      'space-evenly',

    alignItems: 'center',
  },

  timeText: {
    fontSize: 14,

    color: '#111',

    fontFamily:
      'Montserrat-Bold',
  },

  buttonBox: {
    marginTop: 100,
  },
});