import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
};

const AuthButton = ({
  title,
  onPress,
  backgroundColor = '#B4CC18',
  textColor = '#FFFFFF',
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, { backgroundColor }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'BebasNeue-Regular',
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
  },
});
