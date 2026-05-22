import React, {useState} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native'

type Props = {
  value?: boolean
  onValueChange?: (value:boolean)=>void
}

const ToggleButton = ({
  value = false,
  onValueChange,
}:Props) => {

  const [isEnabled, setIsEnabled] = useState(value)

  const toggleSwitch = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)

    if(onValueChange){
      onValueChange(newValue)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={[
        styles.container,
        {
          backgroundColor: isEnabled
            ? '#B7D12A'
            : '#D9D9D9',
        },
      ]}>

      <Animated.View
        style={[
          styles.circle,
          {
            alignSelf: isEnabled
              ? 'flex-end'
              : 'flex-start',
          },
        ]}
      />

    </TouchableOpacity>
  )
}

export default ToggleButton

const styles = StyleSheet.create({

  container: {
    width: 52,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: '#fff',
  },

})