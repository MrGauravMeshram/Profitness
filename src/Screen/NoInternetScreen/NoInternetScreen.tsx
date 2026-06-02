import { View, Text, StyleSheet,Image ,TouchableOpacity,BackHandler} from 'react-native'
import Toast from 'react-native-toast-message';
import React ,{useState,useEffect,useRef}from 'react'

const NoInternetScreen = () => {
    const backPressed = useRef(false);

  useEffect(() => {
    const backAction = () => {
      if (!backPressed.current) {
        backPressed.current = true;

        Toast.show({
          type: 'info',
          text1: 'Are you sure you want to exit',
          position: 'bottom',
          visibilityTime: 2000,
        });

        setTimeout(() => {
          backPressed.current = false;
        }, 2000);

        return true;
      }

      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
        <View  style={{height:200 ,width:200}}>
      <Image source={require('../../assets/png/cloud.png')} style={styles.image} />
      </View>
      <View>
      <Text style={styles.title}>Whoops</Text>
      <Text style={styles.subtitle}>It seems you are not connected to the internet. Please check your connection and try again.</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NoInternetScreen

const styles = StyleSheet.create({
 container: {
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  
},
  image:{
    height: "100%",
    width: "100%",
    resizeMode: 'cover',
  },
  title:{
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  subtitle:{
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
     marginTop: 10,
     width: 300,
  },
  buttonText:{
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    color: '#fff',

  },button:{
    backgroundColor: '#24A6A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  }
})