import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

import Onboarding from '../Screen/Onboarding/Onboarding';
import Login from '../Screen/Auth/Login';
import Signup from '../Screen/Auth/Register';
import Forgot from '../Screen/Auth/Forgotpass';
import Splash from '../Screen/Onboarding/Splash';
import EditProfile from '../Screen/Profile/EditProfileScreen.tsx';
import Verify from '../Screen/Auth/Verify';
import Subscription from '../Screen/Subscription/SubscriptionScreen.tsx';
import MyDrawer from './DrawerNavigation';
import MealDetailsScreen from '../Screen/Meal/MealDetailsScreen.tsx';
import ExerciseDetialsScreen from '../Screen/Exercise/ExerciseDetialsScreen.tsx';
import NewWorkout from '../Screen/Newworkout/NewworkoutScreen.tsx'
import FilterScreen from '../Screen/Filter/FilterScreen';
import ScheduleExerciseScreen from '../Screen/Exercise/ScheduleExerciseScreen.tsx';
import Favorite from '../Screen/SteppingScreen/SteppingScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,

          gestureEnabled: true,

          gestureDirection: 'horizontal',

          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },

            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },

          cardStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen name="Onboarding" component={Onboarding} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Forgot" component={Forgot} />

        <Stack.Screen name="Verify" component={Verify} />

        <Stack.Screen name="Favorite" component={Favorite} />

        <Stack.Screen name="Main" component={MyDrawer} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name='Newworkout' component={NewWorkout}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetialsScreen}/>
        <Stack.Screen name="ScheduleExercise" component={ScheduleExerciseScreen}/>
        <Stack.Screen name="MealDetails" component={MealDetailsScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
