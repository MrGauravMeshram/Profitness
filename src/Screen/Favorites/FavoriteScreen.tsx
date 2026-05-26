import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Header from '../../components/ScreensHeader';
import Selector from '../../components/Selector';
import ExerciseList from '../Home/components/PopularExercise';

import {mealData, workoutData} from './Data/MealData';

const FavoriteScreen = ({navigation}: any) => {
  const [selected, setSelected] = React.useState('Meal');

  const Data = ['Meal', 'Workout'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    
      <Header title="My Favorites" navigation={navigation} />

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        {Data.map((item, index) => (
          <Selector
            key={index}
            title={item}
            active={selected === item}
            onPress={() => setSelected(item)}
            style={{
              height: 50,
              width: 170,
              marginTop: 20,
              marginHorizontal: 8,
            }}
          />

        ))}
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
     <View style={{marginTop:-30,}}>
      <ExerciseList
        data={selected === 'Meal' ? mealData : workoutData}
      />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteScreen;