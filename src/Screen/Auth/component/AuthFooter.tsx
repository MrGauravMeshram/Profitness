import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  title: string;
  actionText: string;
  onPress?: () => void;
};

const AuthFooter = ({ title, actionText, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.actionText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 55,
  },

  title: {
    fontSize: 17,
    color: '#111',
    fontFamily: 'DMSans_18pt-Medium',
  },

  actionText: {
    fontSize: 17,
    color: '#111',

    fontWeight: 800,
  },
});
