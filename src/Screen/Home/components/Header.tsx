import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeHeader = () => {
  const navigation: any = useNavigation();
  return (
    <>
      <View style={styles.circleOne} />

      <View style={styles.circleTwo} />

      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image
            source={require('../../../assets/png/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>

        <View style={styles.profileRow}>
          <Image
            source={require('../../../assets/png/profile2.png')}
            style={styles.profile}
          />
        </View>

        <TouchableOpacity>
          <Image
            source={require('../../../assets/png/bell.png')}
            style={styles.bell}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, Good Morning</Text>

        <Text style={styles.name}>Gaurav !</Text>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 260,
    backgroundColor: '#B7CF1A',
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    paddingHorizontal: 20,

    paddingTop: 55,
    overflow: 'hidden',
  },

  circleOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -80,
    left: -60,
  },

  circleTwo: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -40,
    left: 40,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
    marginTop: 12,
  },

  profileRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
  },

  profile: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },

  textContainer: {
    marginLeft: 12,
    marginTop: 18,
  },

  greeting: {
    fontSize: 14,
    color: '#F5F5F5',
    fontFamily: 'Montserrat-Regular',
  },

  name: {
    marginTop: 4,
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'DMSans_18pt-Bold',
  },

  bell: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
    marginTop: 12,
  },
});
