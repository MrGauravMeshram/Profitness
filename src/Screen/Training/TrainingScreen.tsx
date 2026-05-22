import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/ScreensHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import PremiumModal from '../../components/Modal';
import ExerciseList from '../Home/components/PopularExercise';

const TrainingScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] =
  useState(true);
  const [selectedTab, setSelectedTab] = useState('Beginner');

  const tabs = ['Beginner', 'Intermediate', 'Advanced'];

  const popularData = [
    {
      id: '1',
      image: require('../../assets/png/manStr.png'),
      title: 'Full Shot Woman Stretching Arm',
      level: 'Beginner',
      duration: '30 min',
    },
    {
      id: '2',
      image: require('../../assets/png/mandumbel.png'),
      title: 'Athletic Practicing Claps hands Arm Balance',
      level: 'Beginner',
      duration: '50 min',
    },
    {
      id: '3',
      image: require('../../assets/png/train3.png'),
      title: 'Athlete Practicing Monochrome',
      level: 'Beginner',
      duration: '20 min',
    },
  ];

  const forYouData = [
    {
      id: '1',
      image: require('../../assets/Images/Arms.jpg'),
      title: 'Best For Arms',
      level: '20 min',
    },
    {
      id: '2',
      image: require('../../assets/Images/Boost.jpg'),
      title: 'Energy Boost',
      level: '25 min',
    },
    {
      id: '3',
      image: require('../../assets/Images/Legs.jpg'),
      title: 'Best For Legs',
      level: '18 min',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          name="funnel-outline"
          title="TRAINING"
          navigation={navigation}
          onFilterPress={() => navigation.navigate('Filter')}
        />

        <View style={styles.tabsRow}>
          {tabs.map(tab => {
            const active = selectedTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.8}
                onPress={() => setSelectedTab(tab)}
                style={[styles.tabButton, active && styles.activeTab]}
              >
                <Text style={[styles.tabText, active && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ExerciseList
          heading="Popular Training"
          buttonText=""
          data={popularData}
        />

        {/* Just For You */}
        <View style={styles.forYouContainer}>
          <Text style={styles.forYouHeading}>Just For you</Text>

          <FlatList
            horizontal
            data={forYouData}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingRight: 10,
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: 15,
                }}
              />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} style={styles.forYouCard}>
                <ImageBackground
                  source={item.image}
                  resizeMode="cover"
                  style={styles.forYouImage}
                  imageStyle={{
                    borderRadius: 18,
                  }}
                >
                  <View style={styles.overlay}>
                    <Text numberOfLines={1} style={styles.forYouTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.forYouTime}>{item.level}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton}>
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
     {
  modalVisible && (
    <PremiumModal
      navigation={navigation}
      onClose={() =>
        setModalVisible(false)
      }
    />
  )
}
    </SafeAreaView>
  );
};

export default TrainingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 24,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
  },

  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
    alignSelf: 'center',
    marginLeft: 10,
    marginBottom: 30,
  },

  tabButton: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 12,
  },

  activeTab: {
    backgroundColor: '#111',
  },

  tabText: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Montserrat-Medium',
  },

  activeTabText: {
    color: '#FFF',
  },

  forYouContainer: {
    marginTop: 20,
    paddingBottom: 120,
  },

  forYouHeading: {
    fontSize: 24,
    color: '#111',
    marginBottom: 18,
    paddingHorizontal: 20,
    fontFamily: 'BebasNeue-Regular',
  },

  forYouCard: {
    width: 125,
  },

  forYouImage: {
    width: 125,
    height: 170,
    justifyContent: 'flex-end',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 18,
  },

  forYouTitle: {
    fontSize: 13,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },

  forYouTime: {
    marginTop: 4,
    fontSize: 11,
    color: '#FFF',
    fontFamily: 'DMSans_18pt-Regular',
  },

  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
