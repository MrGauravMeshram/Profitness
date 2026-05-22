import React, { useEffect,useCallback  } from 'react'
import { useFocusEffect } from '@react-navigation/native'


import { View, Text, StyleSheet } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Svg, { Circle } from 'react-native-svg'

import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated'

const AnimatedCircle =
  Animated.createAnimatedComponent(Circle)

type PropsCard = {
  icon: string,
  name: string,
  nums: string,
  texts: string,
  progress: number,
  color: string
}

const Card = ({
  icon,
  name,
  nums,
  texts,
  progress,
  color,
}: PropsCard) => {

  const animatedProgress = useSharedValue(0)

  const radius = 50
  const strokeWidth = 10

  const circumference = 1.5 * Math.PI * radius

 useFocusEffect(
  useCallback(() => {

    animatedProgress.value = 0

    animatedProgress.value = withTiming(progress, {
      duration: 2000,
    })

  }, [])
)

  const animatedProps = useAnimatedProps(() => {

    return {
      strokeDashoffset:
        circumference -
        circumference * animatedProgress.value,
    }

  })

  return (

    <View style={styles.cardView}>
-


      <View style={styles.topPart}>

        <View style={styles.iconView}>

          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="black"
          />

        </View>

        <Text style={styles.topPartText}>
          {name}
        </Text>

      </View>



      <View style={styles.circleContainer}>

        <Svg width={120} height={120}>

    

          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#DCDCDC"
            strokeWidth={strokeWidth}
            fill="none"
          />

          

          <AnimatedCircle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            rotation="-90"
            origin="60,60"
          />

        </Svg>

        

        <View style={styles.textContainer}>

          <Text style={styles.innerText}>
            {nums}
          </Text>

          <Text style={styles.innerSubtitle}>
            {texts}
          </Text>

        </View>

      </View>

    </View>

  )
}

export default Card

const styles = StyleSheet.create({

  cardView: {
    height: 230,
    width: 180,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#F4F4F4',
    overflow: 'hidden',
  },

  iconView: {
    backgroundColor: '#fff',
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topPartText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },

  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  innerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#111',
  },

  innerSubtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },

})