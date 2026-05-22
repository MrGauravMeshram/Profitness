import React from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  title?: string;

  subtitle?: string;

  description?: string;

  highlightText?: string;

  image?: any;
};

const StartComponent = ({
  title = "LET'S GET STARTED",

  subtitle = `The standard chunk of Lorem Ipsum
used since the 1500s is reproduced below
for those interested.`,

  description = `Sculpt your ideal body, free your
true self, transform your life.`,

  highlightText = 'ideal body',

  image = require('../../../assets/png/Maskgroup.png'),
}: Props) => {
  const parts = description.split(highlightText);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <Image source={image} style={styles.image} resizeMode="contain" />

      <Text style={styles.description}>
        {parts[0]}

        <Text style={styles.highlight}>{highlightText}</Text>

        {parts[1]}
      </Text>
    </View>
  );
};

export default StartComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 42,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 10,
  },

  image: {
    width: 320,
    height: 320,
  },

  description: {
    marginTop: 20,
    fontSize: 18,
    color: '#111',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'DMSans_18pt-Medium',
    paddingHorizontal: 20,
  },

  highlight: {
    color: '#B4CC18',
    fontFamily: 'DMSans_18pt-Regular',
  },
});
