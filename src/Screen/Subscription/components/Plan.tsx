import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string;
  duration: string;
  price: string;
  active?: boolean;
  onPress?: () => void;
};

const PlanCard = ({
  title,
  duration,
  price,
  active = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, active ? styles.activeCard : styles.inactiveCard]}
    >
      <View
        style={[
          styles.topBox,
          active ? styles.activeTopBox : styles.inactiveTopBox,
        ]}
      >
        <Text style={[styles.title, active && styles.activeTitle]}>
          {title}
        </Text>
      </View>

      <View style={styles.bottomBox}>
        <Text style={[styles.duration, active && styles.activeText]}>
          {duration}
        </Text>

        <Text style={[styles.price, active && styles.activeText]}>{price}</Text>

        {active && (
          <View style={styles.checkBox}>
            <Ionicons name="checkmark" size={18} color="#FFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PlanCard;

const styles = StyleSheet.create({
  card: {
    width: 125,
    height:170,
    borderRadius: 14,

    overflow: 'hidden',

    backgroundColor: '#EFEFEF',
  },

  activeCard: {
    borderWidth: 1.5,
    borderColor: '#B4CC18',
    backgroundColor: '#E6EDBE',
  },

  inactiveCard: {
    borderWidth: 1.5,
    borderColor: '#DCE3AE',
    backgroundColor: '#EFEFEF',
  },

  topBox: {
    height: 32,

    backgroundColor: '#DCE3AE',

    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTopBox: {
    backgroundColor: '#B4CC18',
  },

  inactiveTopBox: {
    backgroundColor: '#DCE3AE',
  },

  title: {
    fontSize: 14,
    color: '#111',

    fontFamily: 'Montserrat-Medium',
  },

  activeTitle: {
    color: '#000',
  },

  bottomBox: {
    paddingVertical: 18,

    alignItems: 'center',
  },

  duration: {
    fontSize: 14,
    color: '#555',

    marginBottom: 6,

    fontFamily: 'Montserrat-Medium',
  },

  price: {
    fontSize: 21,
    color: '#111',

    fontFamily: 'Montserrat-Bold',
  },

  activeText: {
    color: '#000',
    fontFamily:"Montserrat-Bold",
  
  },

  checkBox: {
    marginTop: 14,

    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor: '#000',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
