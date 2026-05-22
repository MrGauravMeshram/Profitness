import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import React from 'react';

type Props = {
  title: string;
  active?: boolean;
  onPress?: () => void;
};

const Selector = ({ title, active = false, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.btn, active && styles.activeBtn]}
      >
        <Text style={[styles.btnText, active && styles.activeText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 30,

    borderRadius: 6,

    backgroundColor: '#F3F3F3',

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeBtn: {
    backgroundColor: '#000',
  },

  btnText: {
    fontSize: 13,
    color: '#7D7D7D',

    fontFamily: 'Montserrat-SemiBold',
  },

  activeText: {
    color: '#FFF',
  },
});
