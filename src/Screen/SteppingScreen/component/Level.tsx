import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type LevelItem = {
  title: string;
  icon?: any;
};

type Props = {
  selectedLevel: string;

  onSelect: (level: string) => void;

  levels: LevelItem[];
};

const Level = ({ selectedLevel, onSelect, levels }: Props) => {
  return (
    <View style={styles.container}>
      {levels.map(item => {
        const isSelected = selectedLevel === item.title;

        return (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.8}
            onPress={() => onSelect(item.title)}
            style={[styles.card, isSelected && styles.selectedCard]}
          >
            <View style={styles.row}>
              {item.icon && (
                <Image
                  source={item.icon}
                  style={[
                    styles.icon,
                    isSelected && {
                      tintColor: '#FFF',
                    },
                  ]}
                  resizeMode="contain"
                />
              )}

              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  card: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 18,
    backgroundColor: '#FFF',
  },

  selectedCard: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  text: {
    fontSize: 16,
    color: '#111',
    fontFamily: 'DMSans_18pt-Medium',
  },

  selectedText: {
    color: '#FFF',
    fontFamily: 'DMSans_18pt-Bold',
  },
});
