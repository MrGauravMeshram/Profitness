import React, { useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeadingText from '../../components/headingText';
import CustomInput from '../../components/inputfield';
import AuthButton from './component/AuthButton';
import SocialButton from './component/SocialButton';
import AuthFooter from './component/AuthFooter';

import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');

  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={130}>
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
                onChangeText={setFullName}
              />

              <CustomInput
                label="Phone"
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
              />

              <CustomInput
                label="Email address"
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
              />

              <CustomInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <AuthButton title="CREATE ACCOUNT" />
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
              onPress={() => navigation.navigate('Login')}
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
