import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const StretchCard = () => {
  return (
    <>
      <Image
        source={require('../../../assets/png/ManS.png')}
        style={styles.person}
        resizeMode="contain"
      />
      <ImageBackground
        source={require('../../../assets/png/angle.png')}
        style={styles.container}
        imageStyle={styles.bgImage}
      >
        <View style={styles.rightContent}>
          <Text style={styles.title}>FIT YOUNG MAN DOING</Text>

          <Text style={styles.title}>BATTLE STRETCH TRAINING</Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.buttonText}>Start Exercise</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../../assets/png/dumbel.png')}
          style={styles.dumbbell}
          resizeMode="contain"
        />
      </ImageBackground>
    </>
  );
};

export default StretchCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    marginTop: 20,
    marginBottom: -20,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  bgImage: {
    borderRadius: 16,
  },

  person: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: 170,
    height: 210,
    zIndex: 1,
  },

  rightContent: {
    marginLeft: 135,
    marginTop: -50,
  },

  title: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'BebasNeue-Regular',
    lineHeight: 24,
  },

  button: {
    width: 130,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },

  buttonText: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'DMSans_18pt-Bold',
  },

  dumbbell: {
    position: 'absolute',
    left: 180,
    bottom: 25,
    width: 75,
    height: 75,
  },
});
