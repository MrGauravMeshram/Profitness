import { View, Text } from 'react-native'
import SearchBar from '../../components/searchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react'

const SearchBarScreen = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <SearchBar/>
    </SafeAreaView>
  )
}

export default SearchBarScreen