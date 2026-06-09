import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeadingText from '../../components/headingText';
import CustomInput from '../../components/inputfield';
import AuthButton from './component/AuthButton';
import SocialButton from './component/SocialButton';
import Toast from 'react-native-toast-message';
import AuthFooter from './component/AuthFooter';
import {
  getAuth
  ,
  createUserWithEmailAndPassword
}
  from
  '@react-native-firebase/auth'
  ;
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [checkValidation, setValidation] = useState<any>({
    name: 'required',
    phone: 'required',
    email: 'required',
    password: 'required',
  });
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);
  const [firebaseErrors, setFirebaseErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (fullName.trim() === '') {
      setValidation((prev: any) => ({ ...prev, name: 'required' }));
      return;
    }
    const isValid = /^[A-Za-z ]+$/.test(fullName);
    setValidation((prev: any) => ({ ...prev, name: isValid ? '' : 'invalid' }));
  }, [fullName]);

  useEffect(() => {
    if (phone.trim() === '') {
      setValidation((prev: any) => ({ ...prev, phone: 'required' }));
      return;
    }
    const isValidnums = /^[0-9]{10}$/.test(phone);
    setValidation((prev: any) => ({ ...prev, phone: isValidnums ? '' : 'invalid' }));
  }, [phone]);

  useEffect(() => {
    if (email.trim() === '') {
      setValidation((prev: any) => ({ ...prev, email: 'required' }));
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setValidation((prev: any) => ({ ...prev, email: isValidEmail ? '' : 'invalid' }));
    setFirebaseErrors(prev => ({ ...prev, email: '' }));
  }, [email]);

  useEffect(() => {
    if (password.trim() === '') {
      setValidation((prev: any) => ({ ...prev, password: 'required' }));
      return;
    }
    const isValidPassword = password.length >= 6;
    setValidation((prev: any) => ({ ...prev, password: isValidPassword ? '' : 'invalid' }));
    setFirebaseErrors(prev => ({ ...prev, password: '' }));
  }, [password]);

  const getNameError = () => {
    if (checkValidation.name === 'invalid') return 'Please Enter valid name';
    if (checkValidation.name === 'required' && showRequiredErrors) return 'Please enter name';
    return '';
  };

  const getPhoneError = () => {
    if (checkValidation.phone === 'invalid') return 'Please Enter valid phone number';
    if (checkValidation.phone === 'required' && showRequiredErrors) return 'Please enter phone number';
    return '';
  };

  const getEmailError = () => {
    if (checkValidation.email === 'invalid') return 'Please Enter valid Email Address';
    if (checkValidation.email === 'required' && showRequiredErrors) return 'Please enter email address';
    if (firebaseErrors.email) return firebaseErrors.email;
    return '';
  };

  const getPasswordError = () => {
    if (checkValidation.password === 'invalid') return 'Password must be at least 6 characters';
    if (checkValidation.password === 'required' && showRequiredErrors) return 'Please enter password';
    if (firebaseErrors.password) return firebaseErrors.password;
    return '';
  };

  const onRegister = () => {
    let hasEmpty = false;
    const newValidation = { ...checkValidation };
    if (!fullName || fullName.trim() === '') { newValidation.name = 'required'; hasEmpty = true; }
    if (!phone || phone.trim() === '') { newValidation.phone = 'required'; hasEmpty = true; }
    if (!email || email.trim() === '') { newValidation.email = 'required'; hasEmpty = true; }
    if (!password || password.trim() === '') { newValidation.password = 'required'; hasEmpty = true; }

    if (hasEmpty) {
      setValidation(newValidation);
      setShowRequiredErrors(true);
      return;
    }

    const hasValidationError = Object.values(checkValidation).some(val => val === 'invalid');
    if (hasValidationError) {
      return;
    }

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Account created successfully',
          visibilityTime: 2000,
          autoHide: true,
          bottomOffset: 70,
          position: 'bottom'
        });
        navigation.goBack()
      })
      .catch((err: any) => {
        console.log("Firebase Error:", err);
        if (err.code === 'auth/email-already-in-use') {
          setFirebaseErrors(prev => ({ ...prev, email: 'That email address is already in use!' }));
        } else if (err.code === 'auth/invalid-email') {
          setFirebaseErrors(prev => ({ ...prev, email: 'That email address is invalid!' }));
        } else if (err.code === 'auth/weak-password') {
          setFirebaseErrors(prev => ({ ...prev, password: 'The password is too weak!' }));
        } else {
          Alert.alert("Error", err.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.container}>
            <HeadingText
              title="CREATE ACCOUNTS"
              subtitle={'Please enter your credentials to\nproceed'}
              onPress={() => navigation.goBack()}
            />

            <View style={styles.formContainer}>
              <CustomInput
                label="Full Name"
                placeholder="Enter full name"
                value={fullName}
                keytype={'default'}
                onChangeText={setFullName}
                error={getNameError()}
              />

              <CustomInput
                label="Phone"
                placeholder="Enter phone number"
                value={phone}
                length={10}
                keytype={'numeric'}
                onChangeText={setPhone}
                error={getPhoneError()}
              />

              <CustomInput
                label="Email address"
                placeholder="Enter email"
                value={email}
                keytype={'email-address'}
                onChangeText={setEmail}
                error={getEmailError()}
              />

              <CustomInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                keytype={'visible-password'}
                error={getPasswordError()}
              />
            </View>

            <View style={styles.buttonContainer}>
              <AuthButton title="CREATE ACCOUNT" onPress={onRegister} />
            </View>

            <Text style={styles.registerText}>Or Register with</Text>

            <View style={styles.socialContainer}>
              <SocialButton
                title="Connect with Google"
                icon={require('../../assets/png/google.png')}
              />

              <SocialButton
                title="Connect With Facebook"
                icon={require('../../assets/png/facebook.png')}
                backgroundColor="#4967B5"
                borderColor="#4967B5"
                textColor="#FFFFFF"
              />
            </View>

            <AuthFooter
              title="Already have an account? "
              actionText="Login!"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  formContainer: {
    marginTop: 42,
  },

  buttonContainer: {
    marginTop: 8,
  },

  registerText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 24,
    fontFamily: 'DMSans_18pt-Medium',
  },

  socialContainer: {
    marginTop: 18,
  },

  label: {
    fontSize: 16,
    color: '#2F3A4A',
    marginBottom: 6,
    fontFamily: 'DMSans_18pt-Medium',
  },

  inputContainer: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    paddingVertical: 0,
    fontFamily: 'DMSans_18pt-Medium',
  },
});
