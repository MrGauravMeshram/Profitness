import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Header from '../../components/headingText';
import Inputs from '../../components/inputfield';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from './component/AuthButton';

import SocialButton from './component/SocialButton';
import AuthFooter from './component/AuthFooter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={130}>
        <Header
          title="WELCOME TO PRO FITNESS!"
          subtitle={'Hello there, sign in to\ncontinue!'}
          onPress={() => {}}
        />

        <View style={styles.inputWrapper}>
          <Inputs
            label="Email address"
            placeholder="Enter you email"
            value={email}
            onChangeText={setEmail}
          />

          <Inputs
            label="Password"
            placeholder="******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
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
            onPress={() => {
              navigation.navigate('Favorite');
            }}
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
