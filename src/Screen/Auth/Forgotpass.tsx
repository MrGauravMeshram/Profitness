import React, { useState } from 'react';

import { View, StyleSheet, ScrollView ,Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { setResetEmail } from '../../Storage/Redux/slice';
import HeadingText from '../../components/headingText';
import CustomInput from '../../components/inputfield';
import
 { getAuth
,
 signInWithEmailAndPassword ,
sendPasswordResetEmail} 
from
 '@react-native-firebase/auth'
;

import AuthButton from './component/AuthButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('meshramgaurav482@gmail.com');

const dipatch = useDispatch();
  // const [success,setSuccess] = useState(false);


const resetPassword = async () => {
  console.log('Email:', email);
   dipatch(setResetEmail(
    email
   ))
  if (!email.trim()) {
    return;
  }

  try {
    // await sendPasswordResetEmail(
    //   getAuth(),
    //   email.trim()
    // );

    console.log('Reset email sent');
    navigation.navigate('Verify')
  } catch (error: any) {
    console.log('Firebase Error:', error);
    console.log('Code:', error.code);
    console.log('Message:', error.message);
  }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <HeadingText
            title="FORGOT PASSWORD"
            subtitle="Please enter your email below to receive your password reset code."
            onPress={() => navigation.goBack()}
          />

          <View style={styles.formContainer}>
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.buttonContainer}>
            <AuthButton
              title="RESET PASSWORD"
              onPress={resetPassword}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
    paddingHorizontal: 20,
  },

  formContainer: {
    marginTop: 70,
  },

  buttonContainer: {
    marginTop: 90,
  },
});
