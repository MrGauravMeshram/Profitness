import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Image
        source={require('../../assets/png/Ellipse1.png')}
        style={styles.topGlow}
      />

      <Image
        source={require('../../assets/png/Ellipse2.png')}
        style={styles.bottomGlow}
      />

      <View style={styles.centerContainer}>
        <View style={styles.yellowShape} />

        <Image
          source={require('../../assets/png/gymman.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 220,
    height: 230,
    resizeMode: 'contain',
  },

  bottomGlow: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 230,
    height: 230,
    resizeMode: 'contain',
  },

  centerContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },

  yellowShape: {
    position: 'absolute',
    width: 165,
    height: 250,
    backgroundColor: '#F5B800',
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 18,
    transform: [{ rotate: '25deg' }],
    top: height * 0.33,
  },

  mainImage: {
    width: 300,
    height: 380,
    zIndex: 10,
    marginTop: 30,
  },
});
