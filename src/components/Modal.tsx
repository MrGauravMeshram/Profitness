import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Modal from 'react-native-modal';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: any;
  onClose: () => void;
};

const PremiumModal = ({
  navigation,
  onClose,
}: Props) => {

  return (
    <Modal
      isVisible={true}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.6}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver={true}>

      <View style={styles.modalBox}>

        

        <View style={styles.topContainer}>

          <ImageBackground
            source={require('../assets/Images/run.jpg')}
            style={styles.image}
            resizeMode="cover">

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}>
              
              <Ionicons
                name="close"
                size={20}
                color="#FFF"
              />

            </TouchableOpacity>

            <View style={styles.leftBox}>

              <Text style={styles.title}>
                Running
              </Text>

              <Text style={styles.desc}>
                Today's impossible is
                {'\n'}
                tomorrow's normal.
              </Text>

            </View>

          </ImageBackground>

        </View>

        {/* Bottom Section */}

        <View style={styles.bottomBox}>

          <Text style={styles.premiumText}>
            SUBSCRIBE TO PREMIUM
          </Text>

          <Text style={styles.subText}>
            Enjoy unlimited access to
            our premium content
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => {

              onClose();

              navigation.navigate(
                'Subscription',
              );

            }}>
            
            <Text style={styles.buttonText}>
              UNLOCK PREMIUM
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </Modal>
  );
};

export default PremiumModal;

const styles = StyleSheet.create({
  modalBox: {
    height: 380,
    width: 300,

    borderRadius: 18,

    alignSelf: 'center',

    overflow: 'hidden',

    backgroundColor: '#FFF',
  },

  topContainer: {
    height: 160,

    backgroundColor: '#DDE8E6',
  },

  closeBtn: {
    position: 'absolute',

    right: 12,
    top: 12,

    zIndex: 10,
  },

  leftBox: {
    flex: 1,

    paddingHorizontal: 30,

    justifyContent: 'center',
  },

  title: {
    fontSize: 28,

    marginLeft: 25,

    color: '#111',

    marginBottom: 10,

    fontFamily:
      'BebasNeue-Regular',
  },

  desc: {
    fontSize: 13,

    color: '#444',

    lineHeight: 20,

    fontFamily:
      'Montserrat-Regular',
  },

  image: {
    height: '100%',
    width: '100%',
  },

  bottomBox: {
    padding: 24,

    alignItems: 'center',
  },

  premiumText: {
    fontSize: 30,

    color: '#111',

    textAlign: 'center',

    fontFamily:
      'BebasNeue-Regular',
  },

  subText: {
    marginTop: 10,

    fontSize: 14,

    color: '#777',

    textAlign: 'center',

    lineHeight: 22,

    fontFamily:
      'Montserrat-Regular',
  },

  button: {
    marginTop: 25,

    width: '100%',
    height: 56,

    borderRadius: 8,

    backgroundColor: '#B4CC18',

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 24,

    color: '#FFF',

    fontFamily:
      'BebasNeue-Regular',
  },
});