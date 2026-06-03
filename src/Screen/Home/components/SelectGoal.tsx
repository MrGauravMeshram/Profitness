import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

type GoalItem = {
  id: string;
  title: string;
};

type Props = {
  data: GoalItem[];

  selectedId: string;

  onSelect: (id: string) => void;
};

const GoalTabs = ({ data, selectedId, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        nestedScrollEnabled
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.id;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onSelect(item.id)}
              style={[styles.tab, isSelected && styles.selectedTab]}
            >
              <Text style={[styles.tabText, isSelected && styles.selectedText]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default GoalTabs;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: "center",
    marginBottom: 5,

  },

  listContainer: {
    marginTop: 12,
    paddingRight: 20,
  },

  tab: {
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 6,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  selectedTab: {
    backgroundColor: '#000',
  },

  tabText: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'Montserrat-Medium',
  },

  selectedText: {
    color: '#FFF',
  },
});
