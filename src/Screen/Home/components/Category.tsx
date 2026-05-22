import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

type CategoryItem = {
  id: string;
  title: string;
  image: any;
};

type Props = {
  title?: string;

  buttonText?: string;

  data: CategoryItem[];

  onPressItem?: (item: CategoryItem) => void;

  onPressSeeAll?: () => void;
};

const CategoryList = ({
  title = 'CATEGORY',
  buttonText = 'See all',
  data,
  onPressItem,
  onPressSeeAll,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>{title}</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={onPressSeeAll}>
          <Text style={styles.seeAll}>{buttonText}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => onPressItem?.(item)}
          >
            <Image source={item.image} style={styles.image} />

            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 21,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },

  seeAll: {
    fontSize: 15,
    color: '#111',
    fontFamily: 'DMSans_18pt-Bold',
  },

  listContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 18,
  },

  card: {
    alignItems: 'center',
    marginRight: 18,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },

  title: {
    marginTop: 10,
    fontSize: 15,
    color: '#111',
    fontFamily: 'DMSans_18pt-Medium',
  },
});
