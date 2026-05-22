import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SectionList,
} from 'react-native'
import Header from '../../components/ScreensHeader'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import StatsContainer from './component/StatsContainer'
import { BtnData } from './Data/btnData'
import React from 'react'
import Selector from '../../components/Selector'
import { ProgramData } from './Data/programData'
import { ExerciseCardData } from './Data/ExerciseData'
import ExerciseCard from './component/ExerciseCard'
import Buttons from '../Auth/component/AuthButton'

const ExerciseDetailsScreen = ({ navigation }: any) => {

  // ====================================================
  // INNER SECTION LIST
  // — Title is sticky header
  // — desc, week, label are items that scroll away
  // — scrollEnabled FALSE (outer list drives scroll)
  // ====================================================
  const innerSections = [
    {
      id: 'title',
      data: [
        { key: 'desc' },
        { key: 'week' },
        { key: 'label' },
      ],
    },
  ]

  const renderInnerSectionHeader = ({ section }: any) => {
    if (section.id === 'title') {
      return (
        <View style={styles.stickyTitle}>
          <Text style={styles.title}>Exercises with Sitting Dumbbells</Text>
        </View>
      )
    }
    return null
  }

  const renderInnerItem = ({ item }: any) => {
    if (item.key === 'desc') {
      return (
        <View style={styles.titleContainer}>
          <Text style={{ width: '85%', fontFamily: 'Montserrat-Regular', fontSize: 13 }}>
            There are many variations of passages of Lorem Ipsum available, but the majority
            have suffered alteration in some form, by injected humour,
          </Text>
        </View>
      )
    }
    if (item.key === 'week') {
      return (
        <View style={styles.week}>
          <Text style={styles.text}>3 Weeks - 20 Exercise</Text>
          <TouchableOpacity style={styles.wkbtn}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Schedule</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if (item.key === 'label') {
      return (
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={styles.Program}>Exercise Program</Text>
        </View>
      )
    }
    return null
  }

  
  const outerSections = [
    {
      id: 'exercises',
      data: ExerciseCardData,
    },
  ]

  const renderOuterSectionHeader = ({ section }: any) => {
    if (section.id === 'exercises') {
      return (
        <View style={styles.stickyPills}>
          <FlatList
            data={ProgramData}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View>
                <Selector title={item} />
              </View>
            )}
            contentContainerStyle={{ flexDirection: 'row', gap: 10, paddingVertical: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
          />
        </View>
      )
    }
    return null
  }

  const renderOuterItem = ({ item, index }: any) => (
    <>
      <View style={{ paddingVertical: 25 }}>
        <ExerciseCard
          image={item.image}
          title={item.title}
          time={item.time}
          subtitle=""
          kcal={item.kcal}
          level={item.level}
          onPress={() => {}}
        />
      </View>
      {index !== ExerciseCardData.length - 1 && <View style={styles.lines} />}
    </>
  )


  const OuterListHeader = () => (
    <View>
  
      <View style={styles.ViewBox}>
        <ImageBackground
          source={require('../../assets/Images/dhyan.jpg')}
          resizeMode="cover"
          style={{ height: '100%', width: '100%' }}
        >
          <View style={styles.HeaderContainer}>
            <Header title="" navigation={navigation} />
          </View>
        </ImageBackground>

        <View style={styles.bannerBox}>
          <View style={styles.innerText}>
            <MaterialCommunityIcons name="fire" size={24} color="black" />
            <Text style={styles.subtitle}>135kcl</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.innerText}>
            <MaterialCommunityIcons name="clock" size={24} color="black" />
            <Text style={styles.subtitle}>5 min</Text>
          </View>
        </View>
      </View>

    
      <View style={styles.stateBox}>
        {BtnData.map((Stats) => (
          <View key={Stats.id}>
            <StatsContainer title={Stats.title} btnTitle={Stats.subtitle} />
          </View>
        ))}
      </View>


      <SectionList
        sections={innerSections}
        keyExtractor={(item: any) => item.key}
        renderItem={renderInnerItem}
        renderSectionHeader={renderInnerSectionHeader}
        stickySectionHeadersEnabled={true}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      
      <SectionList
        sections={outerSections}
        keyExtractor={(item: any, index) => item.key ?? index.toString()}
        renderItem={renderOuterItem}
        renderSectionHeader={renderOuterSectionHeader}
        ListHeaderComponent={OuterListHeader}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={{ paddingVertical: 10, marginHorizontal: 16 }}>
        <Buttons title="Start Now" onPress={()=>navigation.navigate('ScheduleExercise')}/>
      </View>
    </View>
  )
}

export default ExerciseDetailsScreen

const styles = StyleSheet.create({
  ViewBox: {
    height: 380,
    width: '100%',
  },
  HeaderContainer: {
    marginTop: 30,
  },
  bannerBox: {
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    bottom: -20,
    left: 50,
    gap: 35,
    borderRadius: 15,
  },
  line: {
    height: 25,
    width: 1,
    backgroundColor: 'black',
  },
  innerText: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  stateBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 15,
    marginTop: 25,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  stickyTitle: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  stickyPills: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 22,
  },
  Program: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 4,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  wkbtn: {
    width: 120,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  lines: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
})