import React from 'react';

import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/ScreensHeader';
import SearchBar from '../../components/searchBar';

const Categories = ({ navigation }: any) => {
  const CategoriesData = [
    {
      id: 1,
      image: require('../../assets/Images/Yoga.jpg'),
      title: 'Yoga',
    },

    {
      id: 2,
      image: require('../../assets/Images/Gym.png'),
      title: 'Gym',
    },

    {
      id: 3,
      image: require('../../assets/Images/Cardio.jpg'),
      title: 'Cardio',
    },

    {
      id: 4,
      image: require('../../assets/Images/Streatch.png'),
      title: 'Stretch',
    },

    {
      id: 5,
      image: require('../../assets/Images/Fullbody.jpg'),
      title: 'Full Body',
    },

    {
      id: 6,
      image: require('../../assets/Images/leg.png'),
      title: 'Legs',
    },
  ];

  const renderCategoriesCard = ({ item }: any) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>

        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="" title="CATEGORIES" navigation={navigation} />

      <SearchBar />

      <FlatList
        data={CategoriesData}
        renderItem={renderCategoriesCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 30,
          paddingHorizontal: 50,
        }}
        contentContainerStyle={{
          paddingTop: 30,
          marginTop: 40,
          paddingBottom: 30,
        }}
      />
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardContainer: {
    alignItems: 'center',
  },

  imageContainer: {
    height: 125,
    width: 125,
    borderRadius: 70,
    overflow: 'hidden',
  },

  image: {
    height: '100%',
    width: '100%',
  },

  title: {
    marginTop: 12,
    fontSize: 16,
    color: '#111',
    fontFamily: 'Montserrat-SemiBold',
  },
});
