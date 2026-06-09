import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/headingText';
import Inputs from '../../components/inputfield';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from './component/AuthButton';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import SocialButton from './component/SocialButton';
import AuthFooter from './component/AuthFooter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Login = ({ navigation }: any) => {
  const [checkValidation, setValidation] = useState<any>({
    email: 'required',
    password: 'required',
  });
  const [showRequiredErrors, setShowRequiredErrors] = useState(false);
  const [firebaseErrors, setFirebaseErrors] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (email.trim() === '') {
      setValidation((prev: any) => ({ ...prev, email: 'required' }));
      return;
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setValidation((prev: any) => ({ ...prev, email: isValidEmail ? '' : 'invalid' }));
    setFirebaseErrors(prev => ({ ...prev, email: '', password: '' }));
  }, [email]);

  useEffect(() => {
    if (password.trim() === '') {
      setValidation((prev: any) => ({ ...prev, password: 'required' }));
      return;
    }
    setValidation((prev: any) => ({ ...prev, password: '' }));
    setFirebaseErrors(prev => ({ ...prev, email: '', password: '' }));
  }, [password]);

  const getEmailError = () => {
    if (checkValidation.email === 'invalid') return 'Please Enter valid Email Address';
    if (checkValidation.email === 'required' && showRequiredErrors) return 'Please enter email address';
    if (firebaseErrors.email) return firebaseErrors.email;
    return '';
  };

  const getPasswordError = () => {
    if (checkValidation.password === 'required' && showRequiredErrors) return 'Please enter password';
    if (firebaseErrors.password) return firebaseErrors.password;
    return '';
  };

  const onLogin = () => {
    let hasEmpty = false;
    const newValidation = { ...checkValidation };
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

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log('User signed in:', user);
        Toast.show({
          type: 'success',
          text1: 'Logged in successfully',
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
        getData(); // Navigate to next screen
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error signing in:', errorCode, errorMessage);
        if (errorCode === 'auth/user-not-found') {
          setFirebaseErrors({
            email: 'Wrong email',
            password: '',
          });
        } else if (errorCode === 'auth/wrong-password') {
          setFirebaseErrors({
            email: '',
            password: 'Wrong password',
          });
        } else if (errorCode === 'auth/invalid-credential') {
          setFirebaseErrors({
            email: 'Wrong email or password',
            password: 'Wrong email or password',
          });
        } else if (errorCode === 'auth/invalid-email') {
          setFirebaseErrors(prev => ({ ...prev, email: 'That email address is invalid!' }));
        } else {
          Toast.show({
            type: 'error',
            text1: errorMessage,
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('steppingCompleted');
      if (value !== 'true') {
        navigation.navigate('Favorite');
      } else {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={130}>
        <Header
          title="WELCOME TO PRO FITNESS!"
          subtitle={'Hello there, sign in to\ncontinue!'}
          onPress={() => { }}
        />

        <View style={styles.inputWrapper}>
          <Inputs
            label="Email address"
            placeholder="Enter you email"
            value={email}
            onChangeText={setEmail}
            keytype={'email-address'}
            error={getEmailError()}
          />

          <Inputs
            label="Password"
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keytype={'visible-password'}
            error={getPasswordError()}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => navigation.navigate('Forgot')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <AuthButton
            title="LOGIN"
            onPress={onLogin}
          />
        </View>

        <Text style={styles.orText}>Or Login with</Text>

        <SocialButton
          title="Connect with Google"
          icon={require('../../assets/png/google.png')}
        />

        <SocialButton
          title="Connect With Facebook"
          icon={require('../../assets/png/facebook.png')}
          backgroundColor="#4267B2"
          borderColor="#4267B2"
          textColor="#FFFFFF"
        />

        <AuthFooter
          title="Don’t have an account? "
          actionText="Register!"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },

  inputWrapper: {
    marginTop: 30,
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },

  forgotText: {
    fontSize: 18,
    color: '#111111',
    fontFamily: 'DMSans_18pt-Bold',
  },

  buttonContainer: {
    marginTop: 45,
  },

  orText: {
    textAlign: 'center',
    marginTop: 22,
    color: '#666666',
    fontSize: 16,
    fontFamily: 'DMSans_18pt-Medium',
  },
});
