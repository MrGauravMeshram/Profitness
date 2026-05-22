import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: require('../../assets/png/gymman.png'),
  },

  {
    id: '2',
    image: require('../../assets/png/Women.png'),
  },

  {
    id: '3',
    image: require('../../assets/png/workout.png'),
  },

  {
    id: '4',
    image: require('../../assets/png/mkm.png'),
  },
];

const Onboarding = ({ navigation }: any) => {
  const flatListRef = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {data.slice(1).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex - 1 === index ? '#B0C929' : '#000',

                width: currentIndex - 1 === index ? 18 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.page}>
        {item.id === '1' ? (
          <>
            <View style={styles.introImageContainer}>
              <Image
                source={item.image}
                style={styles.introImage}
                resizeMode="contain"
              />

              <View style={styles.locationCard}>
                <Text style={styles.cardIcon}>📍</Text>

                <Text style={styles.cardTitle}>find a gym</Text>

                <Text style={styles.cardSubText}>near you</Text>

                <Text style={styles.cardSmallText}>
                  search the best{'\n'}
                  gym in your area{'\n'}
                  and get prize
                </Text>
              </View>

              <View style={styles.heartCard}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Text style={styles.cardNumber}>97</Text>

                  <Text style={styles.cardBFM}> BFM</Text>
                </View>

                <Text style={styles.heartIcon}>♥</Text>

                <Text style={styles.minutesText}>3 mints ago</Text>
              </View>

              <View style={styles.memberCard}>
                <Image
                  source={require('../../assets/png/member.png')}
                  style={styles.peopleIcon}
                />

                <Text style={styles.memberNumber}>1.5</Text>

                <Text style={styles.memberText}>members</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                }}
              >
                <Text style={styles.introTitle}>PRO</Text>

                <Text
                  style={[
                    styles.introTitle,
                    {
                      color: '#B0C929',
                    },
                  ]}
                >
                  FITNESS
                </Text>
              </View>

              <Text style={styles.description}>
                We train your body to be
                {'\n'}
                great and fit.
              </Text>

              <TouchableOpacity style={styles.startBtn} onPress={handleNext}>
                <Text style={styles.startText}>LET’S START</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : item.id === '2' ? (
          <>
            <View style={styles.secondImageContainer}>
              <Image
                source={item.image}
                style={styles.secondImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.secondTextContainer}>
              <Text style={styles.secondTitle}>PERFECT BODY</Text>

              <Text style={styles.secondTitle}>
                DOING <Text style={styles.secondHighlight}>CROSSFIT</Text>
              </Text>

              <Text style={styles.secondTitle}>EXERCISES</Text>
            </View>
          </>
        ) : item.id === '3' ? (
          <>
            <View style={styles.thirdImageContainer}>
              <View style={styles.thirdBlob} />

              <Image
                source={item.image}
                style={styles.thirdImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.thirdTextContainer}>
              <Text style={styles.thirdTitle}>SHOT STRONG</Text>

              <Text style={styles.thirdHighlight}>TIMELESS</Text>

              <Text style={styles.thirdTitle}>MAN TRAINING</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.fourthImageContainer}>
              <View style={styles.orangeShape} />

              <View style={styles.greenDots}>
                <View style={styles.dotItem} />
                <View style={styles.dotItem} />
                <View style={styles.dotItem} />
                <View style={styles.dotItem} />
                <View style={styles.dotItem} />
                <View style={styles.dotItem} />
              </View>

              <Image
                source={item.image}
                style={styles.fourthImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.fourthTextContainer}>
              <Text style={styles.fourthTitle}>HEALTHY MUSCULAR</Text>

              <Text style={styles.fourthHighlight}>SPORTSWOMAN</Text>

              <Text style={styles.fourthTitle}>STANDING</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <LinearGradient
        pointerEvents="none"
        colors={
          currentIndex === 0
            ? [
                'rgba(180,204,24,0.45)',
                'rgba(180,204,24,0.12)',
                'rgba(180,204,24,0)',
              ]
            : currentIndex === 1
            ? [
                'rgba(241,202,88,0.45)',
                'rgba(241,202,88,0.15)',
                'rgba(241,202,88,0)',
              ]
            : currentIndex === 2
            ? [
                'rgba(255,193,7,0.45)',
                'rgba(255,193,7,0.15)',
                'rgba(255,193,7,0)',
              ]
            : [
                'rgba(255,128,94,0.45)',
                'rgba(255,128,94,0.15)',
                'rgba(255,128,94,0)',
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dynamicTopGradient}
      />

      <LinearGradient
        pointerEvents="none"
        colors={
          currentIndex === 0
            ? [
                'rgba(180,204,24,0.35)',
                'rgba(180,204,24,0.10)',
                'rgba(180,204,24,0)',
              ]
            : currentIndex === 1
            ? [
                'rgba(255,128,94,0.40)',
                'rgba(255,128,94,0.12)',
                'rgba(255,128,94,0)',
              ]
            : currentIndex === 2
            ? [
                'rgba(241,202,88,0.40)',
                'rgba(241,202,88,0.12)',
                'rgba(241,202,88,0)',
              ]
            : [
                'rgba(255,128,94,0.45)',
                'rgba(255,128,94,0.12)',
                'rgba(255,128,94,0)',
              ]
        }
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.dynamicBottomGradient}
      />

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />

      {currentIndex !== 0 && (
        <View style={styles.fixedFooter}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.bottomText}>SKIP</Text>
          </TouchableOpacity>

          {renderDots()}

          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.bottomText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  page: {
    width,
    height,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  topGradient: {
    position: 'absolute',
    top: -120,
    left: 0,
    width: 300,
    height: 300,
    borderBottomRightRadius: 260,
  },

  bottomGradient: {
    position: 'absolute',
    bottom: -140,
    right: 0,
    width: 300,
    height: 300,
    borderTopLeftRadius: 260,
  },

  introImageContainer: {
    width,
    height: height * 0.55,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  secondImageContainer: {
    width,
    height: height * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  thirdImageContainer: {
    width,
    height: height * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  fourthImageContainer: {
    width,
    height: height * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },

  introImage: {
    width: 390,
    height: 520,
    zIndex: 10,
  },

  secondImage: {
    width: 320,
    height: 420,
  },

  thirdImage: {
    width: 340,
    height: 500,
    zIndex: 10,
  },

  fourthImage: {
    width: 340,
    height: 380,
    zIndex: 10,
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 0,
  },

  secondTextContainer: {
    alignItems: 'center',
    marginTop: 0,
  },

  thirdTextContainer: {
    alignItems: 'center',
    marginTop: 0,
  },

  fourthTextContainer: {
    alignItems: 'center',
    marginTop: 0,
  },

  introTitle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 58,
    lineHeight: 58,
    color: '#111',
  },

  secondTitle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    lineHeight: 50,
    color: '#111',
    textAlign: 'center',
  },

  secondHighlight: {
    color: '#B0C929',
  },

  thirdTitle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    lineHeight: 50,
    color: '#111',
    textAlign: 'center',
  },

  thirdHighlight: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    lineHeight: 50,
    color: '#B0C929',
    textAlign: 'center',
  },

  fourthTitle: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    lineHeight: 50,
    color: '#111',
    textAlign: 'center',
  },

  fourthHighlight: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    lineHeight: 50,
    color: '#B0C929',
    textAlign: 'center',
  },

  description: {
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 30,
    fontFamily: 'DMSans_36pt-Bold',
  },

  startBtn: {
    width: 200,
    height: 62,
    backgroundColor: '#111',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },

  startText: {
    fontFamily: 'BebasNeue-Regular',
    color: '#fff',
    fontSize: 28,
  },

  greenShape: {
    position: 'absolute',
    width: 260,
    height: 280,
    backgroundColor: '#B0C929',
    borderRadius: 80,
    left: 40,
    top: 120,
    transform: [{ rotate: '25deg' }],
  },

  orangeCircle: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: '#FF825C',
    right: 40,
    bottom: 30,
  },

  innerCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: '#B6CB2F',
    bottom: 20,
  },

  thirdBlob: {
    position: 'absolute',
    width: 260,
    height: 270,
    backgroundColor: '#F6BE00',
    borderRadius: 90,
    transform: [{ rotate: '35deg' }],
  },

  orangeShape: {
    position: 'absolute',
    width: 180,
    height: 260,
    backgroundColor: '#FF825C',
    borderRadius: 100,
  },

  greenDots: {
    position: 'absolute',
    right: 70,
    top: 110,
    width: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dotItem: {
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: '#B0C929',
    margin: 4,
  },

  locationCard: {
    position: 'absolute',
    left: 50,
    top: 230,
    width: 105,
    height: 118,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    elevation: 8,
    zIndex: 20,
  },

  heartCard: {
    position: 'absolute',
    right: 42,
    top: 210,
    width: 115,
    height: 90,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    elevation: 8,
    zIndex: 20,
  },

  memberCard: {
    position: 'absolute',
    left: 50,
    bottom: 60,
    width: 90,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    zIndex: 20,
  },

  cardIcon: {
    fontSize: 18,
  },

  cardTitle: {
    fontSize: 12,
    fontFamily: 'DMSans_18pt-Bold',
  },

  cardSubText: {
    fontSize: 11,
    fontFamily: 'DMSans_18pt-Bold',
  },

  cardSmallText: {
    fontSize: 8,
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 12,
  },

  cardNumber: {
    fontSize: 15,
    fontWeight: '700',
  },

  cardBFM: {
    fontSize: 12,
    color: '#FF7A7A',
    fontWeight: '700',
  },

  heartIcon: {
    fontSize: 24,
    color: '#FF5B7F',
  },

  minutesText: {
    fontSize: 11,
    color: '#FF5B7F',
    fontWeight: '600',
  },

  peopleIcon: {
    width: 34,
    height: 22,
    resizeMode: 'contain',
  },

  memberNumber: {
    fontSize: 12,
  },

  memberText: {
    fontSize: 12,
  },

  fixedFooter: {
    position: 'absolute',
    bottom: 52,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  dynamicTopGradient: {
    position: 'absolute',
    top: -120,
    left: 0,
    width: 320,
    height: 320,
    borderBottomRightRadius: 260,
    zIndex: 1,
  },

  dynamicBottomGradient: {
    position: 'absolute',
    bottom: -140,
    right: 0,
    width: 320,
    height: 320,
    borderTopLeftRadius: 260,
    zIndex: 1,
  },

  bottomText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 22,
    color: '#111',
  },

  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    height: 8,
    borderRadius: 10,
    marginHorizontal: 4,
  },
});
