import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screen/Onboarding/Splash';
import Onboarding from '../Screen/Onboarding/Onboarding';
import Login from '../Screen/Auth/Login';
import Signup from '../Screen/Auth/Register';
import Forgot from '../Screen/Auth/Forgotpass';
import Verify from '../Screen/Auth/Verify';
import Favorite from '../Screen/SteppingScreen/SteppingScreen';
import MyDrawer from './DrawerNavigation';
import {TestListScreen, TestDetailScreen} from '../Screen/Test/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilterScreen from '../Screen/Filter/FilterScreen';
import Subscription from '../Screen/Subscription/SubscriptionScreen';
import NewWorkout from '../Screen/Newworkout/NewworkoutScreen';
import EditProfile from '../Screen/Profile/EditProfileScreen';
import ExerciseDetialsScreen from '../Screen/Exercise/ExerciseDetialsScreen';
import ScheduleExerciseScreen from '../Screen/Exercise/ScheduleExerciseScreen';
import MealDetailsScreen from '../Screen/Meal/MealDetailsScreen';
import MealPlanScreen from '../Screen/Meal/MealPlanScreen';
import { TouchableOpacity } from 'react-native';
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Forgot: undefined;
  Verify: undefined;
  Favorite: undefined;
  Main: undefined;
  Filter: undefined;
  Subscription: undefined;
  Newworkout: undefined;
  EditProfile: undefined;
  ExerciseDetails: {item:any};
  ScheduleExercise: undefined;
    MealDetails: {item: any};  

};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
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
    
        <Stack.Screen name="Newworkout" component={NewWorkout} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetialsScreen}
            options={({navigation})=>({
            animation:"fade",
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
            headerLeft:()=>(
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                   <MaterialIcons name="keyboard-arrow-left" color="#000" size={24} />
                   </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="ScheduleExercise"
          component={ScheduleExerciseScreen}
        
        />
      
          <Stack.Screen name="TestDetail" component={TestDetailScreen} options={{
    headerShown: false,
    animation: 'fade',
  }}/>
         <Stack.Screen
  name="MealDetails"
  component={MealDetailsScreen}
  options={{
    headerShown: false,
    animation: 'none',
  }}
/>
<Stack.Screen
  name="MealPlanTest"
  component={MealPlanScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;