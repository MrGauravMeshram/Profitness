import React ,{useCallback,useEffect,useState}from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  BackHandler,
} from 'react-native';
import Toast from 'react-native-toast-message';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';  
import { SafeAreaView } from 'react-native-safe-area-context';
import { Storage } from '../../Storage/MMkvstore';
import Header from '../../components/ScreensHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryList from '../Home/components/Category'

const Profile = ({ navigation }: any) => {
  const [profileImage,setProfileImage] = useState<any>('')
  const[profileDetailsdata,setProfileDetials] = useState<any>('')
const getProfileImage = async () => {
  try{
  const profile = await AsyncStorage.getItem('ImageContainer');

  if (profile) {
    setProfileImage(profile);
  }else{
    setProfileImage('')
  }
}catch(err){
      console.log(err)
}
};

useFocusEffect(
  useCallback(() => {
    getProfileImage();
    getProfileData();
  
  }, [])
);

const getProfileData = () => {
  const data = Storage.getString('userDetails');

  if (data) {
    const parsedData = JSON.parse(data);
    setProfileDetials(parsedData);
  } else {
    setProfileDetials(null);
  }
};
  const GoalsData = [
    {
      id: '1',
      title: 'Yoga',
      image: require('../../assets/Images/Yoga.jpg'),
    },
    {
      id: '2',
      title: 'Gym',
      image: require('../../assets/Images/Gym.png'),
    },
    {
      id: '3',
      title: 'Cardio',
      image: require('../../assets/Images/Cardio.jpg'),
    },
    {
      id: '4',
      title: 'Stretch',
      image: require('../../assets/Images/Streatch.png'),
    },
    {
      id: '5',
      title: 'Full Body',
      image: require('../../assets/Images/Fullbody.jpg'),
    },
  ];

  const MacroData = [
    {
      id: '1',
      title: 'Protein',
      image: require('../../assets/Images/protein.png'),
      value: '130',
      subtitle: 'Grams per day',
    },

    {
      id: '2',
      title: 'Carbs',
      image: require('../../assets/Images/carbs.png'),
      value: '235',
      subtitle: 'Grams per day',
    },

    {
      id: '3',
      title: 'Fat',
      image: require('../../assets/Images/fat.png'),
      value: '60',
      subtitle: 'Grams per day',
    },
  ];
 useFocusEffect(
  useCallback(() => {
    let backPressedOnce = false;

    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp();
        return true;
      }

      backPressedOnce = true;

      Toast.show({
        type: 'info',
        text1: 'Press back again to exit',
        position: 'bottom',
      });

      setTimeout(() => {
        backPressedOnce = false;
      }, 1500);

      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => subscription.remove();
  }, []),
);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Header
          title="PROFILE"
          name="create-outline"
          navigation={navigation}
          onFilterPress={()=>navigation.navigate('EditProfile')}
          icon={null}
        />

        

        <View style={styles.profileContainer}>

          <View style={styles.imageContainer}>
          {profileImage?(
            <Image
              source={{uri:profileImage}}
              resizeMode="cover"
              style={styles.profileImage}
            />):(
              (
            <MaterialCommunityIcons
              name="account"
              size={100}
              color="#1D1E2C"
            style={styles.icon}
            />)
            )}
          </View>

         <Text style={styles.name}>
  {profileDetailsdata?.userName || 'Guest'}
</Text>

          <Text style={styles.memberText}>
            Basic member
          </Text>

        </View>

        {/* Stats */}

        <View style={styles.statsContainer}>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetailsdata?.userWeight || '55'}
              <Text style={styles.smallText}> {profileDetailsdata?.userWeightUnit?.toLowerCase() || 'kg'}</Text>
            </Text>

            <Text style={styles.statLabel}>
              Weight
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetailsdata?.userHeight || '170'}
              <Text style={styles.smallText}> {profileDetailsdata?.userHeightUnit?.toLowerCase() || 'cm'}</Text>
            </Text>

            <Text style={styles.statLabel}>
              Height
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileDetailsdata?.userAge || '18'}
              <Text style={styles.smallText}> {Number(profileDetailsdata?.userAge) === 1 ? 'year' : 'years'}</Text>
            </Text>

            <Text style={styles.statLabel}>
              Age
            </Text>
          </View>

        </View>

        {/* Goal Section */}

        <CategoryList
          title="Goal"
          buttonText=""
          data={GoalsData}
        />

        {/* Macro Nutrient Goals */}

        <View style={styles.macroContainer}>

          <Text style={styles.heading}>
            MACRONUTRIENT GOALS
          </Text>

          <View style={styles.macroRow}>

            {MacroData.map((item) => (
              <View key={item.id} style={styles.macroCard}>

                <Image
                  source={item.image}
                  style={styles.macroImage}
                />

                <Text style={styles.macroTitle}>
                  {item.title}
                </Text>

                <Text style={styles.macroValue}>
                  {item.value}
                </Text>

                <Text style={styles.macroSubtitle}>
                  {item.subtitle}
                </Text>

              </View>
            ))}

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  imageContainer: {
    width: 120,
    height: 120,
    alignSelf:"center",
    borderRadius: 100,
    
    overflow: 'hidden',
    backgroundColor: '#F3B400',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    height: '100%',
    width: '100%',
  },

  name: {
    marginTop: 18,
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    color: '#111',
  },

  memberText: {
    marginTop: 4,
    fontSize: 17,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 18,
    color: '#111',
    fontFamily: 'Montserrat-SemiBold',
  },

  smallText: {
    fontSize: 13,
    fontFamily:"Montserrat-Medium"
  },

  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
    fontFamily: 'Montserrat-Medium',
  },

  line: {
    width: 1,
    height: 30,
    backgroundColor: '#D9D9D9',
  },

  heading: {
    fontSize: 22,
    color: '#111',
    fontFamily: 'BebasNeue-Regular',
    paddingHorizontal: 20,
  },

  macroContainer: {
    marginTop: 35,
    marginBottom: 30,
  },

  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 22,
  },

  macroCard: {
    alignItems: 'center',
  },

  macroImage: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },

  macroTitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-SemiBold',
  },

  macroValue: {
    marginTop: 4,
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-Medium',
  },

  macroSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#666',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
    icon: {
    position: "absolute",
    bottom: 10,
  },
});