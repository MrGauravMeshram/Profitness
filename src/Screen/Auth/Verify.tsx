import React, { useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import HeadingText from '../../components/headingText';
import AuthButton from './component/AuthButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const VerifyAccount = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (text === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <HeadingText
            title="VERIFY ACCOUNT"
            subtitle="Verify your account by entering verification code we sent to dhruvit@gmail.com"
            onPress={() => navigation.goBack()}
          />

          <View style={styles.otpContainer}>
            {otp.map((item, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                value={item}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(item, index);
                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                style={[styles.otpInput, item && styles.activeOtp]}
              />
            ))}
          </View>

          <TouchableOpacity>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <AuthButton title="RESET PASSWORD" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 95,
    paddingHorizontal: 26,
  },

  otpInput: {
    width: 58,
    height: 58,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    color: '#111111',
    fontFamily: 'DMSans_18pt-Bold',
  },

  activeOtp: {
    borderColor: '#111111',
  },

  resendText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#111111',
    textDecorationLine: 'underline',
    fontFamily: 'DMSans_18pt-Bold',
  },

  buttonContainer: {
    marginTop: 78,
  },
});
