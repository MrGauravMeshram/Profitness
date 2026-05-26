import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  month?: string;
  year?: string | number;
  onPrev?: () => void;
  onNext?: () => void;
};

const DateSelector = ({
  month = 'February',
  year = '2022',
  onPrev,
  onNext,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Ionicons name="calendar-outline" size={18} color="#666" />
        <Text style={styles.dateText}>Date</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onPrev} hitSlop={10}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </TouchableOpacity>

        <View style={styles.monthContainer}>
          <Text style={styles.month}>{month}</Text>
          <Text style={styles.year}>{year}</Text>
        </View>

        <TouchableOpacity onPress={onNext} hitSlop={10}>
          <Ionicons name="chevron-forward" size={22} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {

    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#222',
    fontFamily: 'DMSans-Medium',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  monthContainer: {
    alignItems: 'center',
    minWidth: 90,
  },

  month: {
    fontSize: 18,
    color: '#111',
    fontFamily: 'DMSans-SemiBold',
  },

  year: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
    fontFamily: 'DMSans-Regular',
  },
});