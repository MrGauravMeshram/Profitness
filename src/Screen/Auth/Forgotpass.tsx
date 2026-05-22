import React, { useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import HeadingText from '../../components/headingText';
import CustomInput from '../../components/inputfield';
import AuthButton from './component/AuthButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

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
              onPress={() => navigation.navigate('Verify')}
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
