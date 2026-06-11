import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  name?: string;
  title: string;
  navigation: any;
  icon?: any;
  onFilterPress?: () => void;
};

const Header = ({ title, navigation, name, icon = "chevron-back", onFilterPress }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name={icon} size={24} color="#111" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <TouchableOpacity onPress={onFilterPress}>
        <Ionicons name={name} size={22} color="#111" />
      </TouchableOpacity>
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
});
