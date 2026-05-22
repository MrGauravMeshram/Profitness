import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          style={styles.input}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          spellCheck={false}
          autoCapitalize="none"
          autoComplete="off"
          importantForAutofill="no"
          keyboardType="visible-password"
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <EyeOff size={22} color="#444" strokeWidth={2} />
            ) : (
              <Eye size={22} color="#444" strokeWidth={2} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  label: {
    fontSize: 18,
    color: '#2F3A4A',
    marginBottom: 10,

    fontFamily: 'DMSans_18pt-Medium',
  },

  inputContainer: {
    width: '100%',
    height: 62,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    textDecorationLine: 'none',
    fontFamily: 'DMSans_18pt-Medium',
  },
});
