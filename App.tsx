import React ,{useState,useEffect}from 'react'
import StackNavigator from './src/Navigation/StackNavigator'
import 'react-native-gesture-handler';
import {View} from 'react-native'
import { Toastconfig } from './src/components/Toast/Toast';
import Netinfo from '@react-native-community/netinfo';
import { getStaticFeatureFlag } from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/Storage/Redux/store';
import { UseDispatch } from 'react-redux';

import Toast from 'react-native-toast-message';
import NoInternetScreen from './src/Screen/NoInternetScreen/NoInternetScreen';
import { GoogleOneTapSignIn } from 'react-native-nitro-google-signin';
import { getAuth } from '@react-native-firebase/auth';
import { setUser } from './src/Storage/Redux/slice';

const auth = getAuth();
const uid = auth.currentUser?.uid;
console.log(uid)
GoogleOneTapSignIn.configure({
  webClientId: '985481949917-b3hum8it775kv7jurljueb0214fb616q.apps.googleusercontent.com',
});

console.log('SET enabled:', getStaticFeatureFlag('ENABLE_SHARED_ELEMENT_TRANSITIONS'));
const App = () => {
  const [isConnected, setIsConnected] = useState(true); 
  useEffect(() => {
    const checkInternetConnection = Netinfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    }); 
    return () => {      checkInternetConnection();
    };  

  }, [])

  
  // if(!isConnected){
    
  //   return (
  //     <>
      
  //   <NoInternetScreen/>
  //   <Toast/>
  //   </>)
  // } 
  return (
    <>
    <Provider store={store}>
    <GestureHandlerRootView style={{flex:1}}>
     <StackNavigator/>
     {!isConnected &&    <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <NoInternetScreen />
      </View>}
      <Toast bottomOffset={50} config={Toastconfig}/>
    </GestureHandlerRootView>
    </Provider>
  </>
  )
}

export default App