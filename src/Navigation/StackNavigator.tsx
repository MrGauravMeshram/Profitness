import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screen/Onboarding/Splash';
import Onboarding from '../Screen/Onboarding/Onboarding';
import Login from '../Screen/Auth/Login';
import Signup from '../Screen/Auth/Register';
import Forgot from '../Screen/Auth/Forgotpass';
import NotificationScreen from '../Screen/Notification/NotificationScreen';
import Verify from '../Screen/Auth/Verify';
import Favorite from '../Screen/SteppingScreen/SteppingScreen';
import MyDrawer from './DrawerNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TestDetailScreen } from '../Screen/Test/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilterScreen from '../Screen/Filter/FilterScreen';
import Subscription from '../Screen/Subscription/SubscriptionScreen';
import NewWorkout from '../Screen/Newworkout/NewworkoutScreen';
import SearchBarScreen from '../Screen/Searchbar Screen/SearchBarScreen';
import EditProfile from '../Screen/Profile/EditProfileScreen';
import ExerciseDetialsScreen from '../Screen/Exercise/ExerciseDetialsScreen';
import ScheduleExerciseScreen from '../Screen/Exercise/ScheduleExerciseScreen';
import MealDetailsScreen from '../Screen/Meal/MealDetailsScreen';
import MealPlanScreen from '../Screen/Meal/MealPlanScreen';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setUserDetails, setProfileImage, clearUser } from '../Storage/Redux/slice';
import { Storage } from '../Storage/MMkvstore';

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
  ExerciseDetails: { item: any };
  ScheduleExercise: undefined;
  MealDetails: { item: any };

};

const StackNavigation = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userLogin, setUserlogin] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [showSplash, setShowSplash] = useState(true);


  useEffect(() => {
    onBoardingStatus(null);
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthChange)
    return subscriber;
  }, [])


  const handleAuthChange = async (user: any) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          name: user.displayName || null,
          email: user.email || null,
          photoURL: user.photoURL || null,
        })
      );

      try {
        const detailsData = Storage.getString(`userDetails_${user.uid}`);
        if (detailsData) {
          dispatch(setUserDetails(JSON.parse(detailsData)));
        } else {
          dispatch(setUserDetails(null));
        }
      } catch (err) {
        console.log('Error reading MMKV userDetails:', err);
        dispatch(setUserDetails(null));
      }


      try {
        const imageUri = await AsyncStorage.getItem(`ImageContainer_${user.uid}`);
        dispatch(setProfileImage(imageUri));
      } catch (err) {
        console.log('Error reading AsyncStorage ImageContainer:', err);
        dispatch(setProfileImage(null));
      }

      await onBoardingStatus(user.uid);
      setUserlogin(user);
    } else {
      dispatch(clearUser());
      await onBoardingStatus(null);
      setUserlogin(null);
    }

    if (initializing) setInitializing(false);
  };

  const onBoardingStatus = async (uid?: string | null) => {
    const key = uid ? `steppingCompleted_${uid}` : 'steppingCompleted';
    const value = await AsyncStorage.getItem(key);
    setInitialRoute(value === 'true' ? 'Main' : 'Onboarding');
    setIsCompleted(value === 'true');
  };

  if (initialRoute === null) {
    return null;
  }
  if (initializing || initialRoute === null) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator

        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {userLogin ? (
          <>
            {isCompleted ? (
              <>
                <Stack.Screen name="Main" component={MyDrawer} />
                <Stack.Screen name="Favorite" component={Favorite} />
              </>
            ) : (
              <>
                <Stack.Screen name="Favorite" component={Favorite} />
                <Stack.Screen name="Main" component={MyDrawer} />
              </>
            )}
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen name="Subscription" component={Subscription} />
            <Stack.Screen name='Notification' component={NotificationScreen} />
            <Stack.Screen name="Newworkout" component={NewWorkout} />
            <Stack.Screen name="SearchBarScreen" component={SearchBarScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen
              name="ExerciseDetails"
              component={ExerciseDetialsScreen}
              options={{
                animation: "fade",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ScheduleExercise"
              component={ScheduleExerciseScreen}

            />

            <Stack.Screen name="TestDetail" component={TestDetailScreen} options={{
              headerShown: false,
              animation: 'fade',
            }} />
            <Stack.Screen
              name="MealDetails"
              component={MealDetailsScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: "",
                headerTransparent: true,
                animation: 'none',
                headerLeft: (() => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "#FFF", borderRadius: 50 }}>
                    <MaterialIcons name="keyboard-arrow-left" color="#000" size={24} />
                  </TouchableOpacity>

                ))

              })}
            />
            <Stack.Screen
              name="MealPlanTest"
              component={MealPlanScreen}
            />

          </>
        ) : (
          <>
            {showSplash && (
              <Stack.Screen name="Splash">
                {props => <Splash {...props} onFinish={() => setShowSplash(false)} />}
              </Stack.Screen>
            )}
            {isCompleted ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
              </>
            ) : (
              <>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="Verify" component={Verify} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;