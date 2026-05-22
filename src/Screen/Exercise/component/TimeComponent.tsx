import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type Props = {
  value?: string
  onPress?: () => void
}

const TimePickerButton = ({
  value = '05:44 AM',
  onPress,
}: Props) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>

      <Text style={styles.timeText}>
        {value}
      </Text>

      <MaterialIcons
        name="keyboard-arrow-down"
        size={20}
        color="#444"
      />
    </TouchableOpacity>
  )
}

export default TimePickerButton

const styles = StyleSheet.create({

  container: {
    height: 42,
    paddingHorizontal: 14,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    alignSelf: 'flex-start',
  },

  timeText: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-SemiBold',
  },

})