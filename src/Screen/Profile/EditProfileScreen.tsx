import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/ScreensHeader';
import AuthButton from '../Auth/component/AuthButton';

const EditProfile = ({ navigation }: any) => {

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
const [weightUnit, setWeightUnit] = useState('KG');
const [heightUnit, setHeightUnit] = useState('CM');
  return (
    <SafeAreaView style={styles.container}>
<KeyboardAwareScrollView
  showsVerticalScrollIndicator={false}
  enableOnAndroid={true}
  keyboardShouldPersistTaps="handled"
  extraScrollHeight={250}
  contentContainerStyle={{ paddingBottom: 40 }}
>

        <Header
          title="EDIT PROFILE"
          navigation={navigation}
        />

      

        <View style={styles.imageSection}>

          <View style={styles.imageContainer}>
          <MaterialCommunityIcons
  name="account"
  size={100}
  color="#1D1E2C"
  style={styles.icon}
/>


            <TouchableOpacity style={styles.cameraButton}>

              <Ionicons
                name="camera-outline"
                size={22}
                color="#fff"
              />

            </TouchableOpacity>

          </View>

        </View>

        

        <View style={styles.formContainer}>

          

          <Text style={styles.label}>Full Name</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#777"
            />

            <Ionicons
              name="checkmark"
              size={22}
              color="#111"
            />

          </View>

    

          <Text style={styles.label}>Phone</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Phone"
              placeholderTextColor="#777"
            />

          </View>

          

          <Text style={styles.label}>Email address</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#777"
            />

          </View>

  

          <Text style={styles.label}>Weight</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
              keyboardType="numeric"
            />

           <View style={styles.unitContainer}>

  <TouchableOpacity
    style={[
      styles.unitButton,
      weightUnit === 'LBS' && styles.activeUnit,
    ]}
    onPress={() => setWeightUnit('LBS')}
  >

    <Text
      style={
        weightUnit === 'LBS'
          ? styles.activeUnitText
          : styles.unitText
      }
    >
      LBS
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.unitButton,
      weightUnit === 'KG' && styles.activeUnit,
    ]}
    onPress={() => setWeightUnit('KG')}
  >

    <Text
      style={
        weightUnit === 'KG'
          ? styles.activeUnitText
          : styles.unitText
      }
    >
      KG
    </Text>

  </TouchableOpacity>

</View>

          </View>

    

          <Text style={styles.label}>Height</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={height}
              onChangeText={setHeight}
              style={styles.input}
              keyboardType="numeric"
            />

         <View style={styles.unitContainer}>

  <TouchableOpacity
    style={[
      styles.unitButton,
      heightUnit === 'FEET' && styles.activeUnit,
    ]}
    onPress={() => setHeightUnit('FEET')}
  >

    <Text
      style={
        heightUnit === 'FEET'
          ? styles.activeUnitText
          : styles.unitText
      }
    >
      FEET
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.unitButton,
      heightUnit === 'CM' && styles.activeUnit,
    ]}
    onPress={() => setHeightUnit('CM')}
  >

    <Text
      style={
        heightUnit === 'CM'
          ? styles.activeUnitText
          : styles.unitText
      }
    >
      CM
    </Text>

  </TouchableOpacity>

</View>

          </View>

  
          <Text style={styles.label}>Gender</Text>

          <TouchableOpacity style={styles.inputContainer}>

            <View style={styles.genderRow}>

              <MaterialCommunityIcons
                name="gender-male"
                size={22}
                color="#2F3A4A"
              />

              <Text style={styles.genderText}>
                Male
              </Text>

            </View>

            <Ionicons
              name="chevron-down"
              size={22}
              color="#111"
            />

          </TouchableOpacity>

          {/* Age */}

          <Text style={styles.label}>Age</Text>

          <View style={styles.inputContainer}>

            <TextInput
              value={age}
              onChangeText={setAge}
              style={styles.input}
              keyboardType="numeric"
            />

          </View>

    

          <View style={styles.btn}>

            <AuthButton title="SAVE" />

          </View>

        </View>

      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageSection: {
    alignItems: 'center',
    marginTop: 26,
  },

  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#F3B400',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  icon:{
position:"absolute",
bottom:0,
  },

  cameraButton: {
    position: 'absolute',
    backgroundColor: '#00000070',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    paddingHorizontal: 24,
    marginTop: 30,
    paddingBottom: 40,
  },

  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    fontFamily: 'Montserrat-Medium',
  },

  inputContainer: {
    width: '100%',
    height: 62,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 14,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    fontFamily: 'Montserrat-Medium',
  },

  unitContainer: {
    flexDirection: 'row',
    backgroundColor: '#D8D8D8',
    borderRadius: 12,
    padding: 4,
  },

  unitButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  activeUnit: {
    backgroundColor: '#fff',
  },

  unitText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },

  activeUnitText: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'Montserrat-Bold',
  },

  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  genderText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2F3A4A',
    fontFamily: 'Montserrat-Medium',
  },
  btn:{
    position:"absolute",
    bottom:-40,
    width:"100%",
    left:20,
    marginTop:50,
  }

});