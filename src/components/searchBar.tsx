import React from 'react';
import {useNavigation} from '@react-navigation/native';

import { View, TextInput, StyleSheet, Image } from 'react-native';
type SearchBarProps = {
  disablekeyboard?: boolean;
};
const SearchBar = ({disablekeyboard}:SearchBarProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchBox}>
      <Image
        source={require('../assets/png/search.png')}
        style={styles.searchIcon}
        
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor="#444"
        style={styles.input}
         showSoftInputOnFocus={!disablekeyboard}
       onPressIn={() => {
    if (disablekeyboard) {
      navigation.navigate('SearchBarScreen' as never);
    }
  }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBox: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 6,
    marginTop: 25,
    borderWidth: 0.8,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,

    width: 370,
    alignSelf: 'center',
  },

  searchIcon: {
    width: 22,
    height: 22,
    tintColor: '#444',
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111',
  },
});
