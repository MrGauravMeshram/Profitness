import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Animated, {
  FadeIn,
  SharedTransition,
  LinearTransition,
  withTiming,
} from 'react-native-reanimated';
import { ImageSourcePropType } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Skeleton } from '@rneui/themed';
import {useSelector}  from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
type ExerciseItem = {
  id: string;
  image: string | ImageSourcePropType;
  title: string;
  level: string;
  duration: string;
  isFavorite?: boolean;
};

type Props = {
  heading?: string;
  buttonText?: string;
  data: ExerciseItem[];
  onPressItem?: (item: ExerciseItem) => void;
  onPressFavorite?: (item: ExerciseItem) => void;
  index?: any;
  onPressSeeAll?: () => void;
  loader?: boolean
  isFavorite?: boolean;
};




const ExerciseList = ({
  heading = '',
  buttonText = '',
  data,
  onPressItem,
  onPressFavorite,
  onPressSeeAll,
  index,
  loader,
  isFavorite
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const [isLiked, setisLiked] = useState(false);
  const [Time,setTime] = useState()
  const transition = SharedTransition.duration(550).springify() as any;




  if (loader) {
    return (
      <View style={[styles.container, { paddingTop: 30 }]}>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={{ marginBottom: 28 }}>
            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              height={190}
              style={{
                borderRadius: 18,
                width: '100%',
              }}
            />

            <Skeleton
              LinearGradientComponent={LinearGradient}
              animation="wave"
              height={16}
              width={180}
              style={{
                marginTop: 14,
                borderRadius: 6,
              }}
            />

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Skeleton
                height={14}
                width={70}
                style={{ borderRadius: 6 }}
              />

              <View style={{ width: 12 }} />

              <Skeleton
                height={14}
                width={70}
                style={{ borderRadius: 6 }}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.heading}>{heading}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressSeeAll}>
            <Text style={styles.seeAll}>{buttonText}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          removeClippedSubviews={false}
          initialNumToRender={data.length}
          maxToRenderPerBatch={data.length}

          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const isMeal = heading?.toLowerCase().includes('meal') || data?.some(i => i.level?.toLowerCase().includes('kcal'));
            const tagPrefix = isMeal ? 'meal' : 'Exercise';
            const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
            return (
              <Pressable
                style={styles.card}
                onPress={() => onPressItem?.(item)}>
                <View
                  style={styles.imageBox}
                  collapsable={false}
                >
                  {isLoaded && (
                    <Skeleton
                      style={[styles.image, { position: 'absolute' }]}
                      animation="wave"
                      LinearGradientComponent={LinearGradient}
                    />
                  )}
                  <Animated.Image
                    source={imageSource}
                    sharedTransitionTag={`${tagPrefix}-${item.id}`}
                    sharedTransitionStyle={isMeal ? transition : undefined}
                    onLoadStart={() => setIsLoaded(true)}
                    onLoadEnd={() => setIsLoaded(false)}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.favoriteButton}
                    onPress={() => onPressFavorite?.(item)}>
                    {item.isFavorite ? (
                      <FontAwesome name="heart" color="red" size={24} />
                    ) : (
                      <Feather name="heart" color="#000" size={24} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.level}>{item.level}</Text>
                  <View style={styles.dot} />
                  <Image
                    source={require('../../../assets/png/clock.png')}
                    style={styles.clock}
                  />
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ExerciseList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heading: {
    fontSize: 21,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },
  seeAll: {
    fontSize: 15,
    color: '#111',
    fontFamily: 'DMSans_18pt-Bold',
  },
  card: {
    width: '100%',
  },
  imageBox: {
    width: '100%',
    height: 190,
    borderRadius: 18,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 18,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: 18,
    height: 18,
    tintColor: '#FF5A7B',
  },
  title: {
    marginTop: 14,
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-SemiBold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  level: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'DMSans_18pt-Regular',
  },
  dot: {
    width: 1,
    height: 16,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 12,
  },
  clock: {
    width: 16,
    height: 16,
    tintColor: '#23C4E8',
    marginRight: 6,
  },
  duration: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'DMSans_18pt-Regular',
  },
  separator: {
    height: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginTop: 18,
  },
});