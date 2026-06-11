import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState } from 'react'
import { Skeleton } from '@rneui/themed'
import Animated, { SharedTransition } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'


type PropsCard = {
  title: string,
  subtitle: string,
  kcal: string,
  id: number
  time: string,
  level: string,
  image: any
  loader?: boolean
  onPress: () => void
  disableTransition?: boolean
}
const transition = SharedTransition.duration(550).springify() as any;


const ExerciseCard = ({ id, title, subtitle, kcal, time, level, image, onPress, loader, disableTransition }: PropsCard) => {
  const [imageLoading, setImageLoading] = useState(true);
  if (loader) {
    return (
      <View style={style.container}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation='wave'
          width={120}
          height={120}
          style={{ borderRadius: 12 }}
        />

        <View style={{ flex: 1, marginLeft: 16 }}>
          <Skeleton width={160} height={18}
            LinearGradientComponent={LinearGradient}
            animation='wave' />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation='wave'
            width={120}
            height={14}
            style={{ marginTop: 12 }}
          />
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation='wave'
            width={80}
            height={14}
            style={{ marginTop: 12 }}
          />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>

        <View style={style.ImageContainer} collapsable={false}>
          <View style={style.ImageContainer} collapsable={false}>
            {imageLoading && (
              <Skeleton
                width="100%"
                height="100%"
                style={{
                  borderRadius: 12,
                  position: 'absolute',
                }}
                LinearGradientComponent={LinearGradient}
                animation="wave"
              />
            )}

            <Animated.Image
              sharedTransitionTag={disableTransition ? undefined : `Exercise-${id}`}
              source={{ uri: image }}
              style={style.image}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, gap: 10, paddingVertical: 10 }}>

          <Text style={style.title}>{title}</Text>
          <View style={[style.container, { alignItems: "center", gap: 5 }]}>
            <MaterialCommunityIcons
              name="fire"
              size={24}
              color="black"
            />
            <Text style={style.subTitle}>{kcal}</Text>
            <View style={{ height: 20, width: 1, backgroundColor: "black" }} />
            <MaterialCommunityIcons
              name='clock'
              size={24}
              color='black' />
            <Text style={style.subTitle}>{time}</Text>
          </View>
          <Text style={style.subTitle}>{level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ExerciseCard
const style = StyleSheet.create({
  container: {
    flexDirection: "row",

  },
  cardView: {
    height: 120,
    width: 600,
  },
  ImageContainer: {
    height: 120,
    width: 120,

  },
  image: {
    height: "100%",
    width: "100%"
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    width: 250
  },
  subTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12
  }
})