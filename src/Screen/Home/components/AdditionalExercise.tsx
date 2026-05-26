import React from 'react';

import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type ExerciseItem = {
  id: string;
  title: string;
  calories: string;
  duration: string;
  level: string;
  image: any;
  backgroundColor: string;
};

type Props = {
  heading: string;
  data: ExerciseItem[];
};

const AdditionalExercise = ({ heading, data }: Props) => {
  const renderItem = ({ item }: { item: ExerciseItem }) => {
    return (
      <View style={styles.card}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: item.backgroundColor,
            },
          ]}
        >
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.row}>
            <View style={styles.info}>
              <Ionicons name="flame-outline" size={16} color="#49D6E5" />

              <Text style={styles.infoText}>{item.calories}</Text>
            </View>

            <View style={styles.info}>
              <Ionicons name="time-outline" size={16} color="#49D6E5" />

              <Text style={styles.infoText}>{item.duration}</Text>
            </View>
          </View>

          <Text style={styles.level}>{item.level}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{heading}</Text>

        <Text style={styles.seeAll}>See all</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        nestedScrollEnabled
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.line} />}
      />
    </View>
  );
};

export default AdditionalExercise;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  heading: {
    fontSize: 21,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },

  seeAll: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-Bold',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageContainer: {
    width: 92,
    height: 92,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    lineHeight: 30,
    fontFamily: 'Montserrat-SemiBold',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },

  infoText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#666',
    marginLeft: 4,
  },

  level: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Montserrat-Medium',
    marginTop: 8,
  },

  line: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 22,
  },
});
