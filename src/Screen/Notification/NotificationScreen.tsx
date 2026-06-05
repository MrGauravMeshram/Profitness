import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/ScreensHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';

import { NotificationData } from './Data/NotificationData';

const NotificationScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(NotificationData);
  const handleDelete = (id: any) => {
    setNotifications(prev =>
      prev.filter(item => item.id !== id),
    );
  };


  const RightAction = ({
    progress,
    id,
  }: {
    progress: SharedValue<number>;
    id: any;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(progress.value, [0, 1], [0.6, 1], 'clamp');
      const opacity = interpolate(progress.value, [0, 1], [0, 1], 'clamp');
      const translateX = interpolate(progress.value, [0, 1], [40, 0], 'clamp');

      return {
        transform: [{ scale }, { translateX }],
        opacity,
      };
    });

    return (
      <Animated.View
        style={[
          {
            width: 90,
            marginVertical: 8,
            marginRight: 16,
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          onPress={() => handleDelete(id)}
          activeOpacity={0.8}
          style={{
            flex: 1,
            backgroundColor: '#FF3B30',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            elevation: 5,
            shadowColor: '#FF3B30',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}>
          <MaterialIcons
            name="delete"
            size={28}
            color="#FFF"
          />
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 13, marginTop: 4 }}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const renderData = ({ item }: any) => {
    return (
      <Swipeable
        renderRightActions={(progress) => (
          <RightAction progress={progress} id={item.id} />
        )}
        rightThreshold={80}
        overshootRight={false}
      >

        <View
          style={{
            marginHorizontal: 16,
            marginVertical: 8,
            padding: 12,
            backgroundColor: '#FFF',
            borderRadius: 12,
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}>

          <View style={styles.ImageView}>
            <Image
              source={require('../../assets/png/gym.png')}
              style={{ height: 40, width: 40 }}
            />
          </View>

          <View style={{ gap: 3 }}>
            <Text style={styles.TextWidth}>{item.title}</Text>
            <Text>{item.subtitle}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>

        </View>

      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Notification" navigation={navigation} />
      <View>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderData}
          contentContainerStyle={{ paddingVertical: 16 }} />
      </View>
    </SafeAreaView>
  )
}

export default NotificationScreen
const styles = StyleSheet.create({
  ImageView: {
    height: 70,
    backgroundColor: "#cad68aa3",
    width: 70,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 50,

  },
  TextWidth: {
    width: 270,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#111"
  },
  time: {
    color: "#696969",
    fontFamily: "Montserrat-Regular",
    fontSize: 14
  }
})