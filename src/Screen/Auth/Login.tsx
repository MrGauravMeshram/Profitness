import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/headingText';
import Inputs from '../../components/inputfield';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from './component/AuthButton';
import auth, { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import SocialButton from './component/SocialButton';
import AuthFooter from './component/AuthFooter';
import { useDispatch, UseDispatch } from 'react-redux';

import { setUser } from '../../Storage/Redux/slice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleOneTapSignIn, isSuccessResponse, isNoSavedCredentialFoundResponse } from 'react-native-nitro-google-signin';
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
 const dispatch = useDispatch();

const auth = getAuth();
const uid = auth.currentUser?.uid;
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
        getData(user.uid); 
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

  const getData = async (userUid?: string) => {
    try {
      const key = userUid ? `steppingCompleted_${userUid}` : 'steppingCompleted';
      const value = await AsyncStorage.getItem(key);
      if (value !== 'true') {
        navigation.navigate('Favorite');
      } else {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleOneTapSignIn.checkPlayServices();

      let response = await GoogleOneTapSignIn.signIn();
      console.log('Initial Google Sign-In response:', response);

      if (isNoSavedCredentialFoundResponse(response)) {
        console.log('No saved credential found, calling createAccount...');
        response = await GoogleOneTapSignIn.createAccount();
        console.log('Google createAccount response:', response);
      }

      if (isNoSavedCredentialFoundResponse(response)) {
        console.log('Still no credential, calling presentExplicitSignIn...');
        response = await GoogleOneTapSignIn.presentExplicitSignIn();
        console.log('Google presentExplicitSignIn response:', response);
      }

      if (!isSuccessResponse(response)) {
        console.log('Google Sign-In response was not successful:', response);
        return;
      }

      const { idToken } = response.data;
      if (!idToken) {
        throw new Error('No ID Token received from Google Sign-In');
      }

      const googleCredential =
        GoogleAuthProvider.credential(idToken);

      await getAuth().signInWithCredential(
        googleCredential,
      );

      Toast.show({
        type: 'success',
        text1: 'Login Successfully',
        position: 'bottom',
      });
      const currentGoogleUser = getAuth().currentUser;
      getData(currentGoogleUser?.uid);

    } catch (error) {
      console.log('Google Sign-In error:', error);
      Alert.alert('Google Sign-In Error', error instanceof Error ? error.message : String(error));
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
          onPress={signInWithGoogle}
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
