import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const IMAGE = require('../../assets/Images/Tortilla.jpg'); 

export const TestListScreen = ({ navigation }: any) => {
  return (
    <View style={styles.root}>
      <Pressable onPress={() => navigation.navigate('TestDetail')}>
        <Animated.Image
          source={IMAGE}
          sharedTransitionTag="test-image"
          style={styles.small}
          resizeMode="cover"
        />
      </Pressable>
    </View>
  );
};

export const TestDetailScreen = () => {
  return (
    <View style={styles.root}>
      <Animated.Image
        source={IMAGE}
        sharedTransitionTag="test-image"
        style={styles.large}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  small: { width: 150, height: 150, borderRadius: 12 },
  large: { width: '100%', height: 400 },
});