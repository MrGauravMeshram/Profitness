import React from 'react';

import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

type Props = {
  title: string;
  icon: any;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onPress?: () => void;
};

const SocialButton = ({
  title,
  icon,
  backgroundColor = '#FFFFFF',
  borderColor = '#69696940',
  textColor = '#4B5563',
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />

        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 14,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  icon: {
    width: 22,
    height: 22,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },

  text: {
    fontSize: 17,
    marginLeft: 70,
    textAlign: 'center',
    alignSelf: 'center',

    fontFamily: 'DMSans_18pt-Medium',
  },
});
