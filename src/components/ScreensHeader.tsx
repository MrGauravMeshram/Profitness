import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name?: string;
  title: string;
  navigation: any;
  icon?: any;
  onFilterPress?: () => void;
  rightText?: string;
};

const Header = ({ title, navigation, name, icon = "chevron-back", onFilterPress, rightText }: Props) => {
  return (
    <View style={styles.header}>
      {icon ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={icon} size={24} color="#111" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}

      <Text style={styles.headerTitle}>{title}</Text>

      {onFilterPress ? (
        <TouchableOpacity onPress={onFilterPress}>
          {rightText ? (
            <Text style={styles.rightText}>{rightText}</Text>
          ) : name ? (
            <Ionicons name={name} size={22} color="#111" />
          ) : (
            <View style={{ width: 22 }} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 22 }} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: "center",
    elevation: 5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 24,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },

  rightText: {
    fontSize: 14,
    color: '#FF4D4D',
    fontFamily: 'Montserrat-Bold',
  },
});

