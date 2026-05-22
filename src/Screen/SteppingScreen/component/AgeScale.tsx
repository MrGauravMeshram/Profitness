import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

type Props = {
  value: string;

  onChangeValue: (text: string) => void;

  selectedUnit: string;

  onChangeUnit: (unit: string) => void;

  units?: string[];

  placeholder?: string;
};

const WeightSelector = ({
  value,
  onChangeValue,
  selectedUnit,
  onChangeUnit,
  units = ['LBS', 'KG'],
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        {units.map(unit => {
          const isSelected = selectedUnit === unit;

          return (
            <TouchableOpacity
              key={unit}
              activeOpacity={0.8}
              onPress={() => onChangeUnit(unit)}
              style={[styles.unitButton, isSelected && styles.selectedUnit]}
            >
              <Text
                style={[styles.unitText, isSelected && styles.selectedText]}
              >
                {unit}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.valueContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeValue}
          keyboardType="numeric"
          placeholder="00"
          placeholderTextColor="#999"
          style={[styles.input]}
          maxLength={3}
        />

        <Text style={styles.unitLabel}>/ {selectedUnit.toLowerCase()}</Text>
      </View>
    </View>
  );
};

export default WeightSelector;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 3,
  },

  unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  selectedUnit: {
    backgroundColor: '#FFFFFF',
  },

  unitText: {
    fontSize: 22,
    color: '#444',
    fontFamily: 'Montserrat-Medium',
  },

  selectedText: {
    color: '#111',
    fontFamily: 'Montserrat-Medium',
  },

  valueContainer: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  input: {
    fontSize: 22,
    color: '#111',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 10,

    textAlign: 'right',
  },

  unitLabel: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Montserrat-Medium',
  },
});
