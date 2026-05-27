import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home/HomeScreen';

import Exercise from '../Screen/Exercise/ExerciseScreen';
import Meal from '../Screen/Meal/MealPlanScreen';
import Profile from '../Screen/Profile/ProfileScreen';


const Tab = createBottomTabNavigator();


const TabIcon = ({ focused, icon, label }: any) => {
  return (
    <View style={styles.tabItem}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: focused ? '#111' : '#A1A1AA' }]}
      />
      <Text style={[styles.label, { color: focused ? '#111' : '#A1A1AA' }]}>
        {label}
      </Text>
    </View>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      freezeOnBlur: false,
    lazy: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 95,
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 12,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon={require('../assets/png/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="MealTab"
        component={Meal}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Meal Plans" icon={require('../assets/png/spoon.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="ExerciseTab"
        component={Exercise}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Exercise" icon={require('../assets/png/muscle.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Profile" icon={require('../assets/png/profile.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    width: 85,
  },
  icon: { width: 28, height: 28 },
  label: {
    marginTop: 6,
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'DMSans_18pt-Medium',
  },
});