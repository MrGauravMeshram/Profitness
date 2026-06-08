import React, { useMemo, useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  Modal
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Storage } from '../../Storage/MMkvstore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, } from '@gorhom/bottom-sheet';
import Foundation from 'react-native-vector-icons/Foundation';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/ScreensHeader';
import { GenderData } from './Data/GenderData';
import AuthButton from '../Auth/component/AuthButton';



const EditProfile = ({ navigation }: any) => {
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [checkImage, setCheckImage] = useState<boolean>(false);
  const [checkValidation, setValidation] = useState<any>({ name: false, phone: false, email: false, weight: false, height: false, gender: false, age: false })
  const [pushImage, setPushImage] = useState('')
  const [imageUri, setImageUri] = useState('');
  const [originalData, setOriginalData] = useState<any>(null);
  const [originalImage, setOriginalImage] = useState('');
  const [showPermissionModal, setShowPermissionModal] =
    useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weightUnit, setWeightUnit] = useState('KG');
  const [heightUnit, setHeightUnit] = useState('CM');

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const checkimg = await AsyncStorage.getItem(
        'ImageContainer',
      );
      
if (checkimg) {
  setPushImage(checkimg);
  setOriginalImage(checkimg);
  setCheckImage(true);
}

    const data = Storage.getString('userDetails');

if (data) {
  const parsedData = JSON.parse(data);

  setFullName(parsedData.userName || '');
  setPhone(parsedData.userNumber || '');
  setEmail(parsedData.userEmail || '');
  setWeight(parsedData.userWeight || '');
  setGender(parsedData.userGender || '');
  setHeight(parsedData.userHeight || '');
  setAge(parsedData.userAge || '');
  setWeightUnit(parsedData.userWeightUnit || 'KG');
  setHeightUnit(parsedData.userHeightUnit || 'CM');

  setOriginalData({
    userName: parsedData.userName || '',
    userNumber: parsedData.userNumber || '',
    userEmail: parsedData.userEmail || '',
    userWeight: parsedData.userWeight || '',
    userHeight: parsedData.userHeight || '',
    userGender: parsedData.userGender || '',
    userAge: parsedData.userAge || '',
    userWeightUnit: parsedData.userWeightUnit || 'KG',
    userHeightUnit: parsedData.userHeightUnit || 'CM',
  });
}
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async (uri: any) => {
    await AsyncStorage.setItem(
      'ImageContainer',
      uri,
    );
  };


  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonPositive: 'OK',
        },
      );

      console.log('Permission Result:', result);

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (
        result ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        setShowPermissionModal(true);
        return false;
      }

      return false;
    }

    return true;
  };
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
    />
  );
  const bottomSheetClose = () => {
    if (sheetIndex >= 0) {
      bottomSheetRef.current?.close();
    }
  }

  const clearImage = () => {
    setImageUri('');
    setPushImage('');
    bottomSheetRef.current?.close();
    setCheckImage(false);
  }
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('ImageContainer');

      setPushImage('');
      setImageUri('');
      setCheckImage(false);

      bottomSheetRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };
  const openCamera = async () => {
    bottomSheetRef.current?.close();
    setTimeout(async () => {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        return;
      }

      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          saveToPhotos: true,
        },
        response => {
          if (response.didCancel) {
            console.log('Cancelled');
          } else if (response.errorCode) {
            console.log(response.errorMessage);
          } else {
            const uri = response.assets?.[0]?.uri || '';

            console.log(uri);

            setImageUri(uri);
            setPushImage(uri);
            setCheckImage(true);


          }
        },
      );
    }, 300)

  };
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const openGallery = () => {

    bottomSheetRef.current?.close();
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('Cancelled');
        } else if (response.errorCode) {
          console.log(response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri || '';

          console.log(uri);

          setImageUri(uri);
          setPushImage(uri);
          setCheckImage(true);


        }
      },
    );
  };
 const saveProfile = async () => {
  const isProfileChanged =
    JSON.stringify(profileData) !== JSON.stringify(originalData);

  const isImageChanged =
    pushImage !== originalImage;

  
  if (!isProfileChanged && !isImageChanged) {
    navigation.goBack();
    return;
  }

  try {
    await AsyncStorage.setItem(
      'ImageContainer',
      pushImage,
    );

    userData();

    Toast.show({
      type: 'success',
      text1: 'Profile updated successfully',
      position: 'bottom',
    });

    navigation.goBack();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    if (fullName.trim() === '') {
      setValidation({ ...checkValidation, name: false });
      return;
    }

    const isValid = /^[A-Za-z ]+$/.test(fullName);

    setValidation({ ...checkValidation, name: !isValid });
  }, [fullName]);

  useEffect(() => {
    if (phone.trim() === '') {
      setValidation({ ...checkValidation, phone: false });
      return;
    }
    const isValidnums = /^[0-9]{10}$/.test(phone);
    setValidation({ ...checkValidation, phone: !isValidnums });
  }, [phone])
  useEffect(() => {
    if (email.trim() === '') {
      setValidation({ ...checkValidation, email: false });
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setValidation({ ...checkValidation, email: !isValidEmail })
  }, [email])

  useEffect(() => {
    if (weight.trim() === '') {
      setValidation((prev: any) => ({
        ...prev,
        weight: false,
      }));
      return;
    }

    const weightNum = Number(weight);

    const isValidWeight =
      /^\d+(\.\d{1,2})?$/.test(weight) &&
      weightNum > 0 &&
      weightNum <= 500;

    setValidation((prev: any) => ({
      ...prev,
      weight: !isValidWeight,
    }));
  }, [weight]);

  useEffect(() => {
    if (height.trim() === '') {
      setValidation((prev: any) => ({
        ...prev,
        height: false,
      }));
      return;
    }

    const isValidHeight =
      /^\d+(\.\d{1,2})?$/.test(height) &&
      Number(height) > 0 &&
      Number(height) <= 300;

    setValidation((prev: any) => ({
      ...prev,
      height: !isValidHeight,
    }));
  }, [height]);
  useEffect(() => {
    if (age.trim() === '') {
      setValidation((prev: any) => ({
        ...prev,
        age: false,
      }));
      return;
    }

    const isValidAge =
      /^[0-9]+$/.test(age) &&
      Number(age) >= 1 &&
      Number(age) <= 120;

    setValidation((prev: any) => ({
      ...prev,
      age: !isValidAge,
    }));
  }, [age]);
  const profileData = {
    userName: fullName,
    userNumber: phone,
    userEmail: email,
    userWeight: weight,
    userHeight: height,
    userGender: gender,
    userAge: age,
    userWeightUnit: weightUnit,
    userHeightUnit: heightUnit,
  }

  const userData = () => {
    Storage.set("userDetails", JSON.stringify(profileData))
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>


        <Header
          title="EDIT PROFILE"
          navigation={navigation}
        />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={250}


          contentContainerStyle={{ paddingBottom: 40 }}
        >

          <View style={styles.imageSection}>

            <View style={styles.imageContainer}>
              {pushImage ? (
                <Image
                  source={{ uri: pushImage }}
                  style={{ height: "100%", width: "100%" }} />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={100}
                  color="#1D1E2C"
                  style={styles.icon}
                />)}



            </View>
            <TouchableOpacity style={styles.cameraButton}
              onPress={openBottomSheet}>

              {/* <Text style={{textAlign:"center",color:"green",fontFamily:"Montserrat-SemiBold", fontSize:16}}>Edit</Text> */}
              <View style={styles.innercamerabtn}>
                <MaterialCommunityIcons name="pen" color="#FFF" size={14} />
              </View>
            </TouchableOpacity>

          </View>




          <View style={styles.formContainer}>



            <Text style={styles.label}>Full Name</Text>
            <View >
              <View style={[styles.inputContainer, { borderColor: checkValidation.name ? "red" : "lightgrey" }]}>

                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  style={[styles.input,]}

                  placeholder="Enter name"
                  placeholderTextColor="#777"
                />

              </View>
              {checkValidation.name && (<Text style={{ color: 'red' }}>Please Enter valid name</Text>)}
            </View>



            <Text style={styles.label}>Phone</Text>
            <View>
              <View style={[styles.inputContainer, { borderColor: checkValidation.phone ? "red" : "lightgrey" }]}>

                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholder="Phone"
                  placeholderTextColor="#777"
                />

              </View>
              {checkValidation.phone && (<Text style={{ color: 'red' }}>Please Enter valid phone number</Text>)}
            </View>


            <Text style={styles.label}>Email address</Text>
            <View>
              <View style={[styles.inputContainer, { borderColor: checkValidation.email ? "red" : "lightgrey" }]}>

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#777"
                />

              </View>
              {checkValidation.email && (<Text style={{ color: 'red' }}>Please Enter valid Email Address</Text>)}
            </View>



            <Text style={styles.label}>Weight</Text>
            <View>
              <View style={[styles.inputContainer, { borderColor: checkValidation.weight ? "red" : "lightgrey" }]}>

                <TextInput
                  value={weight}
                  onChangeText={setWeight}
                  placeholder='Weight'
                  placeholderTextColor='#777'
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
              {checkValidation.weight && (
                <Text style={{ color: 'red' }}>
                  Please enter a valid weight
                </Text>
              )}
            </View>


            <Text style={styles.label}>Height</Text>
            <View>
              <View style={[styles.inputContainer, { borderColor: checkValidation.height ? "red" : "lightgrey" }]}>

                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  style={styles.input}
                  placeholder='Height'
                  placeholderTextColor='#777'
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
              {checkValidation.height && (
                <Text style={{ color: 'red' }}>
                  Please enter a valid height
                </Text>
              )}
            </View>

            <Text style={styles.label}>Gender</Text>

            <View style={styles.inputContainer}>
              <Dropdown
                style={{ flex: 1 }}
                placeholderStyle={{ color: '#777' }}
                selectedTextStyle={{ color: '#111' }}
                data={GenderData}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={item => {
                  setGender(item.value);
                }}
              />
            </View>



            <Text style={styles.label}>Age</Text>
            <View>
              <View style={[styles.inputContainer, { borderColor: checkValidation.age ? "red" : "lightgrey" }]}>

                <TextInput
                  value={age}
                  placeholder='Age'
                  placeholderTextColor='#777'
                  onChangeText={setAge}
                  style={styles.input}
                  keyboardType="numeric"
                />

              </View>
              {checkValidation.age && (
                <Text style={{ color: 'red' }}>
                  Please enter a valid age
                </Text>
              )}
            </View>





          </View>

        </KeyboardAwareScrollView>
        <TouchableOpacity style={styles.btn}>

          <AuthButton title="SAVE" onPress={saveProfile} />

        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={index => setSheetIndex(index)}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.sheetstyle}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 }, {
              marginRight: checkImage ? 0 : 125
            }]}>
              <TouchableOpacity onPress={bottomSheetClose}>
                <Entypo name="cross" color="#000" size={25} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontFamily: "BebasNeue-Regular", fontSize: 24, textAlign: "center" }}>Profile Picture</Text>
              </View>
              {checkImage && <TouchableOpacity onPress={clearImage}>
                <AntDesign name="delete" color="#000" size={24} />
              </TouchableOpacity>}

            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 10, }}>
              <TouchableOpacity style={styles.bottomView} onPress={openCamera}>
                <Feather name="camera" color="#000" size={24} />

                <Text style={styles.bottomText}>Open Camera</Text>
              </TouchableOpacity>
              <View style={styles.bottomView}>
                <FontAwesome name="photo" color="#000" size={24} />
                <Text onPress={openGallery} style={styles.bottomText}>Open Gallery</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
        <Modal
          visible={showPermissionModal}
          transparent
          animationType="fade"
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowPermissionModal(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{
                width: '80%',
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                Permission Required
              </Text>

              <Text style={{ marginTop: 10 }}>
                Please enable camera permission from settings.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowPermissionModal(false);
                  Linking.openSettings();
                }}
                style={{ marginTop: 20 }}
              >
                <Text style={{ color: 'blue' }}>
                  Open Settings
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  icon: {
    position: "absolute",
    bottom: 10,
  },

  cameraButton: {
    marginTop: 10,
    height: 30,
    bottom: 10,
    right: 160,
    zIndex: 5,
    width: 30,
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "white",

    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  innercamerabtn: {
    height: "85%",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "green"
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
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
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
  btn: {
    marginTop: 35,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  sheetstyle: {
    paddingHorizontal: 16
  },
  bottomView: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 8
  },
  bottomText: {
    fontFamily: "DMSans-Medium",
    fontSize: 16
  }
});