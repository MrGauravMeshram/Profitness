import React, { useMemo, useRef, useState } from 'react';

import { View, Text, StyleSheet, Animated } from 'react-native';

const ITEM_HEIGHT = 70;

type Props = {
  selectedAge?: number;
  onChangeAge?: (age: number) => void;
};

const AgeMeter = ({ selectedAge = 27, onChangeAge }: Props) => {
  const [age, setAge] = useState(selectedAge);

  const scrollY = useRef(new Animated.Value(0)).current;

  const ageData = useMemo(
    () => Array.from({ length: 91 }, (_, i) => i + 10),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <Animated.FlatList
          data={ageData}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          bounces={false}
          initialScrollIndex={17}
          contentContainerStyle={{
            paddingVertical: ITEM_HEIGHT * 3.5,
          }}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          onMomentumScrollEnd={event => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT,
            );

            const currentAge = ageData[index];

            setAge(currentAge);

            onChangeAge?.(currentAge);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * ITEM_HEIGHT,
              (index - 1) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 1) * ITEM_HEIGHT,
              (index + 2) * ITEM_HEIGHT,
            ];

            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [0.45, 0.7, 1, 0.7, 0.45],
              extrapolate: 'clamp',
            });

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [0.82, 0.9, 1, 0.9, 0.82],
              extrapolate: 'clamp',
            });

            const translateY = scrollY.interpolate({
              inputRange,
              outputRange: [-25, -10, 0, 10, 25],
              extrapolate: 'clamp',
            });

            const isSelected = age === item;

            return (
              <Animated.View
                style={[
                  styles.itemContainer,
                  {
                    opacity,
                    transform: [{ scale }, { translateY }],
                  },
                ]}
              >
                <View style={[styles.ageBox, isSelected && styles.selectedBox]}>
                  <Text
                    style={[styles.ageText, isSelected && styles.selectedText]}
                  >
                    {item}
                  </Text>
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AgeMeter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listWrapper: {
    height: ITEM_HEIGHT * 9,
  },

  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ageBox: {
    width: 74,
    height: 42,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedBox: {
    backgroundColor: '#000',
  },

  ageText: {
    fontSize: 24,
    color: '#98A2B3',
    fontFamily: 'DMSans_18pt-Medium',
  },

  selectedText: {
    color: '#FFF',
    fontSize: 34,
    fontFamily: 'BebasNeue-Regular',
  },
});
