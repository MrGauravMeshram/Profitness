import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MealPlanScreen from '../Screen/Meal/MealPlanScreen';
import MealDetailsScreen from '../Screen/Meal/MealDetailsScreen';

const Stack = createNativeStackNavigator();

export default function MealStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen
        name="MealPlan"
        component={MealPlanScreen}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
      />
    </Stack.Navigator>
  );
}