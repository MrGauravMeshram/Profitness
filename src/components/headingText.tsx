import React from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  reverse?: boolean;
};

const HeadingText = ({ title, subtitle, onPress, reverse }: HeaderProps) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <Image
          source={require('../assets/png/left-arrow.png')}
          style={styles.arrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={[styles.textContainer, reverse && styles.reverseContainer]}>
        {reverse ? (
          <>
            <Text style={styles.subtitle}>{subtitle}</Text>

            <Text style={styles.title}>{title}</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle}>{subtitle}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default HeadingText;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },

  backBtn: {
    width: 13,
    height: 13,
    marginTop: 30,
  },

  arrow: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    marginTop: 28,
  },

  reverseContainer: {
    height: 80,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 30,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },

  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 8,
    lineHeight: 28,
    fontFamily: 'DMSans_18pt-Medium',
  },
});
